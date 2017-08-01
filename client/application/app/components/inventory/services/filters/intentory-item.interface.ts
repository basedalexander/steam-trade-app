import { IInventoryItem } from '../item.interface';

export interface IInventoryFilter {
    type: string;
    name: string;
    color?: string;
    filterFunc: (item: IInventoryItem) => boolean;
}