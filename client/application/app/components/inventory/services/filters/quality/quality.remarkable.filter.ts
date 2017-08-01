import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let qualityRemarkableFilter: IInventoryFilter = {
    type: 'quality',
    name: 'remarkable',
    color: '#8847ff',
    filterFunc: function (item: IInventoryItem): boolean {
        return /remarkable/img.test(item.quality.fullName);
    }
};