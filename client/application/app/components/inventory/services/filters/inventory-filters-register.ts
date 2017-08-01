import { IInventoryFilter } from './intentory-item.interface';

export class FilterRegistry {
    constructor(type: string, filter: IInventoryFilter) {
        this.type = type;
        this.filters = [];
        this.filters.push(filter);
    }
    public type: string;
    public filters: IInventoryFilter[];
}

export class InventoryFiltersRegister {
    static getFilters(): FilterRegistry[]  {
        return InventoryFiltersRegister.filters;
    }

    static registerSingleFilter(filter: any): void {
        let type: FilterRegistry = InventoryFiltersRegister.filters.filter(registry => registry.type === filter.type)[0];

        if (type) {
            type.filters.push(filter);
        }
        else {
            InventoryFiltersRegister.filters.push(new FilterRegistry(filter.type, filter));
        }
    }

    static registerFilters(filters: any[]): void {
        filters.forEach(filter => {
            this.registerSingleFilter(filter);
        })
    }

    static filters: FilterRegistry[] = [];
}
