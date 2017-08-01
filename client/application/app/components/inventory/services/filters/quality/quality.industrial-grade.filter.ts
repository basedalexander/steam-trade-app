import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let qualityIndustrialGradeFilter: IInventoryFilter = {
    type: 'quality',
    name: 'industrial grade',
    color: '#5e98d9',
    filterFunc: function (item: IInventoryItem): boolean {
        return /industrial grade/img.test(item.quality.fullName);
    }
};