import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let qualityFactoryNewFilter: IInventoryFilter = {
    type: 'exterior',
    name: 'factory new',
    filterFunc: function (item: IInventoryItem): boolean {
        return (item.exterior) && (/factory new/img.test(item.exterior.fullName));
    }
};