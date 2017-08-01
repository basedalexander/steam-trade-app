import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let typePassFilter: IInventoryFilter = {
    type: 'type',
    name: 'pass',
    filterFunc: function (item: IInventoryItem): boolean {
        return /pass/img.test(item.type.fullName);
    }
};