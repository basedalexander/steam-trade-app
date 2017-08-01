import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let categoryNormalFilter: IInventoryFilter = {
    type: 'category',
    name: 'normal',
    filterFunc: function (item: IInventoryItem): boolean {
        return /normal/img.test(item.category.fullName);
    }
};