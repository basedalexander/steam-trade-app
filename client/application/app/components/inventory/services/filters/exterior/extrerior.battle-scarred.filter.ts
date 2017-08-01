import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let qualityBattleScarredFilter: IInventoryFilter = {
    type: 'exterior',
    name: 'battle-scarred',
    filterFunc: function (item: IInventoryItem): boolean {
        return (item.exterior) && (/battle-scarred/img.test(item.exterior.fullName));
    }
};