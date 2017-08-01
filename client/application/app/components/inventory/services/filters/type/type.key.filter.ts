import { IInventoryFilter } from '../intentory-item.interface';
import { IInventoryItem } from '../../item.interface';

export let typeKeyFilter: IInventoryFilter = {
    type: 'type',
    name: 'key',
    filterFunc: function (item: IInventoryItem): boolean {
        return /key/img.test(item.type.fullName);
    }
};