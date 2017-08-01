import { BlacklistChecker } from './checker';
import { minPriceBLChecker } from './min-price.bl-checker';
import { keyOverstockBLChecker } from './key-overstock.bl-checker';

export const BLCheckers: BlacklistChecker[] = [
    minPriceBLChecker
];