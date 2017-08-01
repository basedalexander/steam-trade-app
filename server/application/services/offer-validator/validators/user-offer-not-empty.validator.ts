import { OfferValidator } from '../offer-validator.interface';
import { IOffer } from '../server-offer-validator';
import { IPopulatedOffer } from '../server-offer-validator';

export let userOfferNotEmpty: OfferValidator = (populatedOffer: IPopulatedOffer, originalOffer: IOffer): Promise<void> =>{
    return new Promise<void>((resolve, reject) => {
        if (populatedOffer.user.items.length > 0) {
            resolve();
        }
        else {
            reject({
                message: 'User offer is empty'
            });
        }
    });
};