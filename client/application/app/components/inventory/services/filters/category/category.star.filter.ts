import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let categoryStarFilter: IInventoryFilter = {
    type: 'category',
    name: '★',
    color: '#8650ac',
    filterFunc: function (item: IInventoryItem): boolean {
        return /^★$/img.test(item.category.fullName);
    }
};