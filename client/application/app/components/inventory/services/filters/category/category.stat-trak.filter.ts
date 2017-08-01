import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let categoryStatTrakFilter: IInventoryFilter = {
    type: 'category',
    name: 'StatTrak™',
    color: '#cf6a32',
    filterFunc: function (item: IInventoryItem): boolean {
        return (/^StatTrak™/img.test(item.market_hash_name)) &&
            !(/★/img.test(item.category.fullName))
    }
};