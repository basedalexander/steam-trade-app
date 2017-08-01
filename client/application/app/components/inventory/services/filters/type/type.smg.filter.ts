import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let typeSMGFilter: IInventoryFilter = {
    type: 'type',
    name: 'SMG',
    filterFunc: function (item: IInventoryItem): boolean {
        return /SMG/img.test(item.type.fullName);
    }
};