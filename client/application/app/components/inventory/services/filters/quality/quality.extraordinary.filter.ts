import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

// not tradable
export let qualityExtraordinaryFilter: IInventoryFilter = {
    type: 'quality',
    name: 'extraordinary',
    color: '#eb4b4b',
    filterFunc: function (item: IInventoryItem): boolean {
        return /extraordinary/img.test(item.quality.fullName);
    }
};