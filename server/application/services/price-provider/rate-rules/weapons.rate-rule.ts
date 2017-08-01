import { IRateRule } from '../rate-rule.interface';

export let weaponsRateRule: IRateRule = {
    name: 'Weapons',
    '0': 0.90,
    '1': 0.95,
    check: (item: any): boolean => {
        return (item.weapons) && (/Mil-Spec Grade|Restricted|Industrial Grade/i.test(item.quality.fullName));
    }
};