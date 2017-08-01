import { Injectable } from '@angular/core';

@Injectable()
export class InventorySorterService {
    sort(inventory: any[], highestPriceOnTop: boolean): any[] {

        if (highestPriceOnTop) {
            inventory.sort((a, b) => {

                let bIsMoreExpensive: boolean = a.price < b.price;
                let aIsMoreExpensive: boolean = a.price > b.price;

                if (bIsMoreExpensive) {
                    return 1;
                }
                else if (aIsMoreExpensive) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
        }
        else {
            inventory.sort((a, b) => {

                let bIsMoreExpensive: boolean = a.price < b.price;
                let aIsMoreExpensive: boolean = a.price > b.price;

                if (bIsMoreExpensive) {
                    return -1;
                }
                else if (aIsMoreExpensive) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }

        let result: any[] = [];

        let availableItems: any[] = inventory.filter(item => !item.unavailable);
        let unavailableItems: any[] = inventory.filter(item => item.unavailable);

        result = result.concat(availableItems, unavailableItems);

        return result;
    }
}