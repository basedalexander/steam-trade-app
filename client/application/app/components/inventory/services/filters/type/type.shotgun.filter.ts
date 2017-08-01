import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let typeShotgunFilter: IInventoryFilter = {
    type: 'type',
    name: 'shotgun',
    filterFunc: function (item: IInventoryItem): boolean {
        return /shotgun/img.test(item.type.fullName);
    }
};