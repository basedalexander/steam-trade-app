import { OfferValidator } from '../offer-validator.interface';
import { userOfferNotEmpty } from './user-offer-not-empty.validator';
import { offerNotFake } from './offer-not-fake.validator';
import { priceChecker } from './price-checker.validator';

export let validators: OfferValidator[] = [
    offerNotFake,
    userOfferNotEmpty,
    priceChecker
];