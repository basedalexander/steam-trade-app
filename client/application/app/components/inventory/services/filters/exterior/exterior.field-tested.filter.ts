import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let qualityFieldTestedFilter: IInventoryFilter = {
    type: 'exterior',
    name: 'field-tested',
    filterFunc: function (item: IInventoryItem): boolean {
        return (item.exterior) && (/field-tested/img.test(item.exterior.fullName));
    }
};