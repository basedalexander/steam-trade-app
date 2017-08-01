import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let typeSniperRifleFilter: IInventoryFilter = {
    type: 'type',
    name: 'sniper rifle',
    filterFunc: function (item: IInventoryItem): boolean {
        return /sniper rifle/img.test(item.type.fullName);
    }
};