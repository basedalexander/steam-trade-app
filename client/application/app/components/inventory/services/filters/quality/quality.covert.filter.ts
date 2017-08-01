import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let qualityCovertFilter: IInventoryFilter = {
    type: 'quality',
    name: 'covert',
    color: '#eb4b4b',
    filterFunc: function (item: IInventoryItem): boolean {
        return /covert/img.test(item.quality.fullName);
    }
};