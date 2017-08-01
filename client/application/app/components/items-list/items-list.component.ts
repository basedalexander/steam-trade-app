import { Component, Input, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { IInventoryItem } from '../inventory/services/item.interface';
import { ItemsListVirtualScrollService, VirtualScrollCalculationResult } from '../inventory/services/inventory-virtual-scroll.service';
import { DomHelperService } from '../../../common/dom-helper.service';
import { MathService } from '../../../common/math.service';

@Component({
    moduleId: module.id,
    selector: 'items-list',
    templateUrl: './items-list.component.html',
    styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements AfterViewInit {
    @Input() items: IInventoryItem[];
    @Input() vsEnabled: boolean;
    @Input() hiddenItems: string[];

    @Output() itemClick: EventEmitter<IInventoryItem> = new EventEmitter<IInventoryItem>();

    constructor(
        private ref: ElementRef,
        private domHelper: DomHelperService,
        private math: MathService
    ) {
        this.initVsData();
    }

    itemUnavailableText: string = 'This item is unavailable for trade, there are could be many reasons: (too low price, reached stock limit in our bots for this item, or just because the item is unstable).';

    vsData: VirtualScrollCalculationResult;

    ngAfterViewInit(): void {
        this.vsService = new ItemsListVirtualScrollService(this.domHelper, this.math);
        this.vsService.init(this.ref.nativeElement);
        this.vsService.change.subscribe((result: VirtualScrollCalculationResult) => {
            this.vsData = result;
        });
    }

    onItemClick(item: IInventoryItem): void {
        this.itemClick.emit(item);
    }

    isHidden(item: IInventoryItem): boolean {
        if (!this.hiddenItems) {
            return false;
        }

        return item.id.every(id => this.hiddenItems.includes(id));
    }

    getItemAmount(item: IInventoryItem): number {
        let result: number = 0;

        item.id.forEach(id => {
            if (!this.hiddenItems.includes(id)) {
                result += 1;
            }
        });

        return result;
    }

    private initVsData(): void {
        this.vsData = {
            preIndex: 0,
            postIndex: 100
        };
    }

    private vsService: ItemsListVirtualScrollService;
}