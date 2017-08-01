import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let qualityMilSpecGradeFilter: IInventoryFilter = {
    type: 'quality',
    name: 'mil-spec grade',
    color: '#4b69ff',
    filterFunc: function (item: IInventoryItem): boolean {
        return /mil-spec grade/img.test(item.quality.fullName);
    }
};