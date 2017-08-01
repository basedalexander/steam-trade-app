import { OfferValidator } from '../offer-validator.interface';
import { IOffer } from '../server-offer-validator';
import { IPopulatedOffer } from '../server-offer-validator';

export let priceChecker: OfferValidator = (populatedOffer: IPopulatedOffer, originalOffer: IOffer): Promise<void> => {
    return new Promise<void>((resolve, reject) => {

        let userItemsCost: number = calcItemsSum(populatedOffer.user.items);
        let appItemsCost: number = calcItemsSum(populatedOffer.app.items);

        if (userItemsCost > appItemsCost) {
            resolve();
        }
        else {
            reject(new Error(`User's offer costs lower then bot's offer `));
        }
    });
};

function calcItemsSum(items: any): number {
    let sum: number = 0;

    items.forEach(item => {

        let itemsInStack: number = item.id.length;

        sum += (itemsInStack * item.price);
    });

    return sum;
}