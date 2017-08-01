import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let typeGiftFilter: IInventoryFilter = {
    type: 'type',
    name: 'gift',
    filterFunc: function (item: IInventoryItem): boolean {
        return /gift/img.test(item.type.fullName);
    }
};