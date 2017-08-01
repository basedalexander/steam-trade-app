import { IInventoryItem } from '../components/inventory/services/item.interface';

export interface IInventoryRequestResult {
    owners: string[];
    items: IInventoryItem[];
}

export interface IInventoryProvider {
    get(): Promise<IInventoryRequestResult>;
    listenChanges(any: Function): void;
}