import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let qualityHighGradeFilter: IInventoryFilter = {
    type: 'quality',
    name: 'high grade',
    color: '#4b69ff',
    filterFunc: function (item: IInventoryItem): boolean {
        return /high grade/img.test(item.quality.fullName);
    }
};