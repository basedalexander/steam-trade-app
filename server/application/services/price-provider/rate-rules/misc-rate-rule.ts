import { IRateRule } from '../rate-rule.interface';

export let miscRateRule: IRateRule = {
    name: 'Misc',
    '0': 0.85,
    '1': 0.90,
    check: (item: any): boolean => {
        return /Container|Gift|Music Kit|Sticker/i.test(item.type.fullName);
    }
};