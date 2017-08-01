import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let qualityConsumerGradeFilter: IInventoryFilter = {
    type: 'quality',
    name: 'consumer grade',
    color: '#b0c3d9',
    filterFunc: function (item: IInventoryItem): boolean {
        return /consumer grade/img.test(item.quality.fullName);
    }
};