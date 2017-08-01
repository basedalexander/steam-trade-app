import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let qualityExoticFilter: IInventoryFilter = {
    type: 'quality',
    name: 'exotic',
    color: '#d32ce6',
    filterFunc: function (item: IInventoryItem): boolean {
        return /exotic/img.test(item.quality.fullName);
    }
};