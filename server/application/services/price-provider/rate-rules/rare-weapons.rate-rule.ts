import { IRateRule } from '../rate-rule.interface';

export let rareWeaponsRateRule: IRateRule = {
    name: 'Rare weapons',
    '0': 0.95,
    '1': 1.00,
    check: (item: any): boolean => {
        return /covert|classified/i.test(item.quality.fullName);
    }
};