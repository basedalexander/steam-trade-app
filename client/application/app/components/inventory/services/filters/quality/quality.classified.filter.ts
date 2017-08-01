import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let qualityClassifiedFilter: IInventoryFilter = {
    type: 'quality',
    name: 'classified',
    color: '#d32ce6',
    filterFunc: function (item: IInventoryItem): boolean {
        return /classified/img.test(item.quality.fullName);
    }
};