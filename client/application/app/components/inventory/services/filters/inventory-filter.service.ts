import { Injectable } from '@angular/core';

import { FilterRegistry } from './inventory-filters-register';
import { IInventoryItem } from '../item.interface';
import { copyDeep } from '../../../../../utils/index';

@Injectable()
export class InventoryFilterService {

    set filters(value: FilterRegistry[]) {
        this._filters = value;
    }

    filter(items: IInventoryItem[]): IInventoryItem[] {
        let result = items;

        if (this._filters.length) {
            for(let filterGroupIndex = 0; filterGroupIndex < this._filters.length; filterGroupIndex++) {

                let filterGroup: FilterRegistry = this._filters[filterGroupIndex];

                result = result.filter(item => {
                    for(let filterIndex = 0; filterIndex < filterGroup.filters.length; filterIndex++) {
                        let filter = filterGroup.filters[filterIndex].filterFunc;
                        if (filter(item)) {
                            return true;
                        }
                    }
                    return false;
                });
            }
        }

        return copyDeep(result);
    }

    private _filters: FilterRegistry[] = [];
}