import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let qualityRestrictedFilter: IInventoryFilter = {
    type: 'quality',
    name: 'restricted',
    color: '#8847ff',
    filterFunc: function (item: IInventoryItem): boolean {
        return /restricted/img.test(item.quality.fullName);
    }
};