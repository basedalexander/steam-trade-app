import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let typeContainerFilter: IInventoryFilter = {
    type: 'type',
    name: 'container',
    filterFunc: function (item: IInventoryItem): boolean {
        return /container/img.test(item.type.fullName);
    }
};