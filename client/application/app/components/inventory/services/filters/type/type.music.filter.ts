import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let typeMusicFilter: IInventoryFilter = {
    type: 'type',
    name: 'music kit',
    filterFunc: function (item: IInventoryItem): boolean {
        return /music/img.test(item.type.fullName);
    }
};