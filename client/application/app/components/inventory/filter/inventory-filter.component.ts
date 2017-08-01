import { Component, Input, EventEmitter, Output } from '@angular/core';

import { InventoryFiltersRegister } from '../services/filters/inventory-filters-register';
import { FilterRegistry } from '../services/filters/inventory-filters-register';
import { IInventoryFilter } from '../services/filters/intentory-item.interface';

@Component({
    selector: 'inventory-filter',
    template:
    `
    <section class='filter' [class.visible]="_visible && filterRegistry">
        <ul class="filters">
            <li *ngFor='let category of filterRegistry' class="inventory-filter">
                <h3 class="filter-group-title">{{category.type}}</h3>
                <ul>
                    <li *ngFor="let filter of category.filters">
                        <label class='filter-label' [ngStyle]="{ 'color': filter.color }">
                            <input type="checkbox" #check (change)="onFilterChecked(check.checked, filter)">
                             {{filter.name}}
                        </label>
                    </li>
                </ul>
            </li>
        </ul>
    </section>
    `,
    styles: [
    `
    .filter-label {
        cursor: pointer;
    }
    `
    ]
})
export class InventoryFilterComponent {

    @Output() filterChange: EventEmitter<FilterRegistry[]> = new EventEmitter<FilterRegistry[]>();

    @Input() set visible(flag: boolean) {
        this._visible = flag;
    }

    private _visible: boolean;

    constructor() {
        this.filterRegistry = InventoryFiltersRegister.getFilters();
    }

    onFilterChecked(checked: boolean, filter: IInventoryFilter): void {
        if (checked) {
            this.addFilter(filter);
        }
        else {
            this.removeFilter(filter);
        }
    }

    private addFilter(filter: IInventoryFilter): void {
        let filterType = this.enabledFilters.filter(filterTypeRegistry => filterTypeRegistry.type === filter.type)[0];
        if (filterType) {
            filterType.filters.push(filter);
        }
        else {
            this.enabledFilters.push({
                type: filter.type,
                filters: [filter]
            });
        }

        this.filterChanged();
    }

    private removeFilter(filter: IInventoryFilter): void {
        // todo code duplication
        let filterType = this.enabledFilters.filter(filterTypeRegistry => filterTypeRegistry.type === filter.type)[0];
        let index: number = filterType.filters.findIndex(item => item.name === filter.name);

        filterType.filters.splice(index, 1);
        if (filterType.filters.length === 0) {
            this.removeFilterGroup(filter.type);
        }

        this.filterChanged();
    }

    private removeFilterGroup(type: string): void {
        let index: number = this.enabledFilters.findIndex(item => item.type === type);
        this.enabledFilters.splice(index, 1);
    }

    private filterChanged(): void {
        this.filterChange.emit(this.enabledFilters);
    }

     private enabledFilters: FilterRegistry[] = [];
     private filterRegistry: FilterRegistry[];
}