import { IInventoryItem } from '../../item.interface';
import { IInventoryFilter } from '../intentory-item.interface';

export let typeStickerFilter: IInventoryFilter = {
    type: 'type',
    name: 'sticker',
    filterFunc: function (item: IInventoryItem): boolean {
        return /sticker/img.test(item.type.fullName);
    }
};