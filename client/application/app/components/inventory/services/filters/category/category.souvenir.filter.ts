import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let categorySouvenirFilter: IInventoryFilter = {
    type: 'category',
    name: 'souvenir',
    color: '#ffd700',
    filterFunc: function (item: IInventoryItem): boolean {
        return /souvenir/img.test(item.category.fullName);
    }
};