import { IRateRule } from '../rate-rule.interface';

export let knifeRateRule: IRateRule = {
    name: 'Knives',
    '0': 0.95,
    '1': 1.00,
    check: (item: any): boolean => {
        return item.type.fullName === 'Knife';
    }
};