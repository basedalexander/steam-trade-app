import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { IInventoryProvider } from '../../services/inventory.provider.interface';
import { copyDeep } from '../../../utils/index';
import { FilterRegistry } from './services/filters/inventory-filters-register';
import { InventoryFilterService } from './services/filters/inventory-filter.service';
import { InventorySearchService } from './services/inventory-search.service';
import { IInventoryItem } from './services/item.interface';
import { InventoryUtilsService } from './services/inventory-utils.service';
import { IInventoryChangeData } from '../../services/app-inventory-provider';
import { InventorySorterService } from './services/inventory-sorter.service';

@Component({
    selector: 'inventory',
    moduleId: module.id,
    templateUrl: './inventory.component.html',
    styleUrls: [`./inventory.component.css`]
})
export class InventoryComponent implements OnInit {
    @Input() inventoryProvider: IInventoryProvider;

    @Input() set selectedItems(val: IInventoryItem[]) {
        if (val) {
            this._selectedItems = this.inventoryUtilsService.retrieveItemsIds(val);
        }
    }

    @Output() itemClick: EventEmitter<IInventoryItem> = new EventEmitter<IInventoryItem>();

    @Output() ownerSelect: EventEmitter<string> = new EventEmitter<string>();

    constructor(private inventoryFilterService: InventoryFilterService,
                private inventorySearchService: InventorySearchService,
                private inventoryUtilsService: InventoryUtilsService,
                private inventorySorterService: InventorySorterService) {
    }

    protected _selectedItems: string[];

    onItemClick(item: IInventoryItem): void {

        if (this.owners) {
            if (!this.currentOwner) {
                let ownerIndex = this.owners.indexOf(item.owner);
                this.selectOwner(item.owner, ownerIndex);
            }
        }

        let id: string = this.getUnselectedItemId(item);

        if (!id) {
            throw new Error(`Selected item that already selected`)
        }

        let selectedItem: IInventoryItem = JSON.parse(JSON.stringify(item));
        selectedItem.id = [id];

        this.itemClick.emit(selectedItem);
    }

    private getUnselectedItemId(item: IInventoryItem): string {
        let result: string;

        let i: number = item.id.length - 1;

        for (i; i >= 0; i--) {
            let itemId: string = item.id[i];

            if ( !(this._selectedItems.includes(itemId)) ) {
                result = itemId;
                break;
            }
        }

        return result;
    }

    filterIsVisible: boolean = false;
    filterActive: boolean = false;
    highestPriceOnTop: boolean = true;

    toggleOrder(): void {
        this.highestPriceOnTop = !this.highestPriceOnTop;

        this.orderItems();
        this.orderFilteredItems();
        this.orderRawItems();
    }

    refresh(): void {
        this.loadInventory();
    }

    ngOnInit(): void {
        this.loadInventory();
        this.listenChanges();
    }

    private loadInventory(): void {
        this.authRequired = false;
        this.loading = true;

        this.inventoryProvider.get()
            .then(data => {
                this.owners = data.owners;
                this.rawItems = [].concat(copyDeep(data.items));

                this.orderRawItems();

                this.filter();
                this.loading = false;
            })
            .catch(err => {
                this.authRequired = true;
                this.loading = false;
            })
    }

    protected owners: string[];
    protected currentOwner: { name: string, id: string };

    selectOwner(ownerId: string, index: number): void {

        if (this._selectedItems.length) {
            return;
        }

        this.currentOwner = {
            name: `bot${index + 1}`,
            id: ownerId
        };
        this.filter();
        this.makeSearch(this.lastSearchPhrase);

        this.ownerSelect.emit(ownerId);
    }

    unselectOwner(): void {

        if (this._selectedItems.length) {
            return;
        }

        this.currentOwner = undefined;
        this.filter();
        this.makeSearch(this.lastSearchPhrase);

        this.ownerSelect.emit(null);
    }

    private listenChanges(): void {
        this.inventoryProvider.listenChanges((changeData: IInventoryChangeData) => {

            let addedItems: IInventoryItem[] = changeData.added;
            let deletedItems: string[] = changeData.removed;

            if (deletedItems) {
                return this.removeItems(deletedItems);
            }

            if (addedItems) {
                addedItems.forEach(addedItem => {
                    let stack: any = this.rawItems.find(item => (item.classid === addedItem.classid) && (item.owner === addedItem.owner));

                    if (stack) {
                        stack.id = addedItem.id;
                    }
                    else {
                        this.rawItems.push(addedItem);
                    }
                });

                this.rawItems = this.rawItems.concat([]);

                this.orderRawItems();

                this.filter();
            }
        });
    }

    public removeItems(ids: string[]): void {
        this.inventoryUtilsService.removeItems(ids, this.items);
        this.inventoryUtilsService.removeItems(ids, this.filteredItems);
        this.inventoryUtilsService.removeItems(ids, this.rawItems);
    }

    public addItems(items: IInventoryItem[]): void {
        this.rawItems = this.rawItems.concat(items);

        this.orderRawItems();

        this.filter();
    }

    get itemsCount(): number {
        let count: number = 0;

        if (this.items) {
            this.items.forEach(item => count = count + item.id.length);
        }

        return count;
    }

    onFilterChange(filters: FilterRegistry[]): void {
        this.filterActive = !!filters.length;

        this.inventoryFilterService.filters = filters;
        this.filter();
        this.makeSearch(this.lastSearchPhrase);
    }

    onSearchChanged(value: string) {
        this.lastSearchPhrase = value;
        this.makeSearch(this.lastSearchPhrase);
    }

    private lastSearchPhrase: string = '';
    private loading: boolean = false;
    private authRequired: boolean = false;
    private items: any[];
    private filteredItems: any[];
    private rawItems: any[];

    private setItems(items: any[]): void {
        this.items = [].concat(copyDeep(items));
    }

    private order(collection: any[]): any[] {
        return this.inventorySorterService.sort(collection, this.highestPriceOnTop);
    }

    private orderRawItems(): void {
        this.rawItems = this.order(this.rawItems);
    }

    private orderFilteredItems(): void {
        this.filteredItems = this.order(this.filteredItems);
    }

    private orderItems(): void {
        this.items = this.order(this.items);
    }

    private makeSearch(searchString: string): void {
        this.loading = true;

        if (searchString === '') {
            this.setItems(this.filteredItems);
            this.loading = false;
        }
        else {
            let result: IInventoryItem[] = this.inventorySearchService.search(searchString, this.items);
            this.setItems(result);
            this.loading = false;
        }
    }

    private filter(): void {
        let filteredItems = this.rawItems;

        if (this.currentOwner) {
            filteredItems = filteredItems.filter(item => item.owner === this.currentOwner.id);
        }

        this.filteredItems = this.inventoryFilterService.filter(filteredItems);

        this.setItems(this.filteredItems);
    }

    private toggleFilter() {
        this.filterIsVisible = !this.filterIsVisible;
    }
}
