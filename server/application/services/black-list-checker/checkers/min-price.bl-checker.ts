import { BlacklistChecker } from './checker';
import { appConfig } from '../../../app-config';

export let minPriceBLChecker: BlacklistChecker = (item: any, alreadyParsedItems: any[]) => {
    let minPrice: number = appConfig.lowestPrice;

    return item.price < minPrice;
};