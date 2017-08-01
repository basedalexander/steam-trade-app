import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let typeKnifeFilter: IInventoryFilter = {
    type: 'type',
    name: 'knife',
    filterFunc: function (item: IInventoryItem): boolean {
        return /knife/img.test(item.type.fullName);
    }
};