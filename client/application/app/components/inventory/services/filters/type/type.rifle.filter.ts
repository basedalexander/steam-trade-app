import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let typeRifleFilter: IInventoryFilter = {
    type: 'type',
    name: 'rifle',
    filterFunc: function (item: IInventoryItem): boolean {
        return /^rifle$/img.test(item.type.fullName);
    }
};