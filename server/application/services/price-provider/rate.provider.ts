import { EItemOwnerType } from './owner-type.enum';
import { IRateRule } from './rate-rule.interface';

export class RateProvider {

    get(item: any, ownerType: EItemOwnerType): number {
        let length = this.rules.length;

        for (let i = 0; i < length; i++) {
            let rule: IRateRule = this.rules[i];

            if (rule.check(item)) {
                return rule[ownerType];
            }
        }
    }

    getAll(): any[] {
        return this.rules.map(rule => ({
            name: rule.name,
            user: this.float2Percent(rule[EItemOwnerType.User]),
            bot: this.float2Percent(rule[EItemOwnerType.Bot])
        }));
    }

    registerRules(rules: IRateRule[]): void {
        this.rules = rules;
    }

    private rules: IRateRule[] = [];

    private float2Percent(num: number): number {
        return num * 100;
    }
}

export let rateProvider = new RateProvider();