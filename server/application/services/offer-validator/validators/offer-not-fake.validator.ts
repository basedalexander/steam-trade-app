import { OfferValidator } from '../offer-validator.interface';
import { IOffer } from '../server-offer-validator';
import { IPopulatedOffer } from '../server-offer-validator';

export let offerNotFake: OfferValidator = (populatedOffer: IPopulatedOffer, originalOffer: IOffer): Promise<void> => {
    return new Promise<void>((resolve, reject) => {

        let appItemsCount: number = getItemsCount(populatedOffer.app.items);

        if (appItemsCount !== originalOffer.app.items.length) {
            return reject({ message: `Can't process this offer`});
        }

        let userItemsCount: number = getItemsCount(populatedOffer.user.items);

        if (userItemsCount !== originalOffer.user.items.length) {
            return reject({ message: `Can't process this offer`});
        }

        resolve();
    });
};

function getItemsCount(items: any[]): number {
    let result: number = 0;

    items.forEach(item => result += item.id.length);

    return result;
}