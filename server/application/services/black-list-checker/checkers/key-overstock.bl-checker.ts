import { BlacklistChecker } from './checker';
import { appItemsProvider } from '../../app-items.provider';

export let keyOverstockBLChecker: BlacklistChecker = (item: any, alreadyParsedItems: any[]): boolean => {
    let appItems: any[] = appItemsProvider.get();

    return true;
};