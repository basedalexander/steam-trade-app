import { Injectable } from '@angular/core';
import { IInventoryItem } from './item.interface';

@Injectable()
export class InventoryUtilsService {

    public removeItems(removedItemsIds: string[], inventory: IInventoryItem[]): void {
        for (let i = 0; i < inventory.length; i++) {

            let item: IInventoryItem = inventory[i];

            item.id.forEach((id, index) => {
                if (removedItemsIds.includes(id)) {
                    item.id.splice(index, 1);
                }
            });
        }
    }

    public retrieveItemsIds(items: IInventoryItem[]): string[] {
        let result: string[] = [];

        items.forEach(item => result = result.concat(item.id));

        return result;
    }
}