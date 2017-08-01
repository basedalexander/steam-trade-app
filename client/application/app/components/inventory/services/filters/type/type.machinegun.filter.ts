import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let typeMachinegunFilter: IInventoryFilter = {
    type: 'type',
    name: 'machinegun',
    filterFunc: function (item: IInventoryItem): boolean {
        return /machinegun/img.test(item.type.fullName);
    }
};