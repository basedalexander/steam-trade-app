import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let typePistolFilter: IInventoryFilter = {
    type: 'type',
    name: 'pistol',
    filterFunc: function (item: IInventoryItem): boolean {
        return /pistol/img.test(item.type.fullName);
    }
};