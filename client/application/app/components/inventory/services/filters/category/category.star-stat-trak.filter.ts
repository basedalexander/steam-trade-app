import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let categoryStarStatTrakFilter: IInventoryFilter = {
    type: 'category',
    name: '★ StatTrak™',
    color: '#8650ac',
    filterFunc: function (item: IInventoryItem): boolean {
        return (/★ StatTrak™/img.test(item.market_hash_name)) &&
            !(/^★$™/img.test(item.category.fullName))
    }
};