import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let qualityWellWornFilter: IInventoryFilter = {
    type: 'exterior',
    name: 'well-worn',
    filterFunc: function (item: IInventoryItem): boolean {
        return (item.exterior) && (/well-worn/img.test(item.exterior.fullName));
    }
};