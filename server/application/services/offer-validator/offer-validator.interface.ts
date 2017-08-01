import { IOffer } from './server-offer-validator';
import { IPopulatedOffer } from './server-offer-validator';

export type OfferValidator = (populatedOffer: IPopulatedOffer, originalOffer: IOffer) => Promise<void>;