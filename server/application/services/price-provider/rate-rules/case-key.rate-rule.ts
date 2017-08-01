import { IRateRule } from '../rate-rule.interface';

export let caseKeyRateRule: IRateRule = {
    name: 'Keys',
    '0': 0.98,
    '1': 1.03,
    check: (item: any): boolean => {
        return (item.type.fullName === 'Key') && (item.market_hash_name.indexOf('Case Key') !== -1);
    }
};