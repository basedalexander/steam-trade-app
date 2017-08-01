import { OfferValidator } from './offer-validator.interface';
import { validators } from './validators/index';
import { inventoryModel } from '../../models/inventory';
import { inventoryParser } from '../inventory-parser';

export interface IConvertedOffer {
    owner?: string;
    items: string[];
}

export interface IOffer {
    user: IConvertedOffer,
    app: IConvertedOffer
}

export interface IPopulatedOffer {
    user: {
        owner: string;
        items: any[]
    };
    app: {
        owner: string;
        items: any[];
    }
}

export class ServerOfferValidator {

    constructor(private validators: OfferValidator[]) {}

    validate(offer: IOffer): Promise<void> {
        return new Promise<void>((resolve, reject) => {

            let offerCorrect: boolean = this.checkOfferCorrectness(offer);

            if (!offerCorrect) {
                return reject({ message: 'Offer is not correct'});
            }

            this.populateOfferWithRealItems(offer)
                .then((populatedOffer: IPopulatedOffer) => {
                    let promises = this.validators.map(validator => validator(populatedOffer, offer));

                    Promise.all(promises)
                        .then(() => resolve())
                        .catch(reject);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    private checkOfferCorrectness(offer: IOffer): boolean {
        return  (offer.user && offer.app) &&
                (!!offer.user.owner) &&
                (offer.user.items && offer.app.items) &&
                (Array.isArray(offer.user.items) && Array.isArray(offer.app.items)) &&
                (this.checkItemsAsIds(offer.user.items) &&
                this.checkItemsAsIds(offer.app.items));
    }

    private checkItemsAsIds(items: string[]): boolean {
        return items.every(item => typeof item === 'string');
    }

    private populateOfferWithRealItems(offer: IOffer): Promise<IPopulatedOffer> {
        return new Promise<IPopulatedOffer>((resolve, reject) => {

            let promises = [
                inventoryModel.findById(offer.user.owner),
                inventoryModel.findById(offer.app.owner)
            ];

            Promise.all(promises)
                .then(data => {
                    let userItems: any[] = data[0];
                    let appItems: any[] = data[1];

                    userItems = userItems.filter(item => offer.user.items.includes(item.id));
                    appItems = appItems.filter(item => offer.app.items.includes(item.id));

                    let appParsedItems: any[] = inventoryParser.parseBotInventory(appItems, offer.app.owner);
                    let userParsedItems: any[] = inventoryParser.parseUserInventory(userItems, offer.user.owner);

                    let populatedOffer: IPopulatedOffer = JSON.parse(JSON.stringify(offer));

                    populatedOffer.app.items = appParsedItems;
                    populatedOffer.user.items = userParsedItems;

                    resolve(populatedOffer);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export let serverOfferValidator: ServerOfferValidator = new ServerOfferValidator(validators);