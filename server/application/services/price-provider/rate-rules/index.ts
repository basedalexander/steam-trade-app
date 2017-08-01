import { rateProvider } from '../rate.provider';
import { IRateRule } from '../rate-rule.interface';
import { caseKeyRateRule } from './case-key.rate-rule';
import { knifeRateRule } from './knife.rate-rule';
import { rareWeaponsRateRule } from './rare-weapons.rate-rule';
import { weaponsRateRule } from './weapons.rate-rule';
import { miscRateRule } from './misc-rate-rule';

const rules: IRateRule[] = [
    caseKeyRateRule,
    knifeRateRule,
    rareWeaponsRateRule,
    weaponsRateRule,
    miscRateRule
];

rateProvider.registerRules(rules);