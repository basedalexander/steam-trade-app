import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let qualityBaseGradeFilter: IInventoryFilter = {
    type: 'quality',
    name: 'base grade',
    color: '#b0c3d9',
    filterFunc: function (item: IInventoryItem): boolean {
        return /base grade/img.test(item.quality.fullName);
    }
};