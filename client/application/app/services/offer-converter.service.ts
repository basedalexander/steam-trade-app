import { Injectable } from '@angular/core';
import { IInventoryItem } from '../components/inventory/services/item.interface';

export interface IConvertedOffer {
    owner?: string;
    items: string[];
}

export interface IOffer {
    user: IConvertedOffer;
    app: IConvertedOffer;
}

@Injectable()
export class OfferConverterService {
    convert(userOffer: IInventoryItem[], appOffer: IInventoryItem[], botOwner: string): IOffer {
        let user: IConvertedOffer = {
            items: this.retrieveItemIds(userOffer)
        };

        let app: IConvertedOffer = {
            owner: botOwner,
            items: this.retrieveItemIds(appOffer)
        };

        return {
            user: user,
            app: app
        }
    }

    private getOwner(inventory: IInventoryItem[]): string {
        return inventory.length ? inventory[0].owner : undefined
    }

    private retrieveItemIds(items: IInventoryItem[]): string[] {
        let result: string[] = [];

        items.forEach(item => result = result.concat(item.id));

        return result;
    }
}