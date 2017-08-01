import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let qualityMinimalWearFilter: IInventoryFilter = {
    type: 'exterior',
    name: 'minimal wear',
    filterFunc: function (item: IInventoryItem): boolean {
        return (item.exterior) && (/minimal wear/img.test(item.exterior.fullName));
    }
};