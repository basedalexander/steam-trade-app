import { appItemsProvider, AppItemsProvider } from '../app-items.provider';
import { appConfig, IAppConfig } from '../../app-config';

export class OverstockChecker {
    constructor(
        private appConfig: IAppConfig,
        private appItemsProvider: AppItemsProvider
    ) {
        this.registerOverstockLimits();
    }

    check(item: any, parsedItems: any): boolean {

        if ( !(this.limits.has(item.market_hash_name)) ) {
            return false;
        }

        let limit: number = this.limits.get(item.market_hash_name);

        let appItems: any[] = this.appItemsProvider.get();

        let itemAmount: number = 0;

        itemAmount = itemAmount + this.getSameItemsAmount(item, appItems);

        if (itemAmount >= limit) {
            return true;
        }

        itemAmount = itemAmount + this.getSameItemsAmount(item, parsedItems);

        if (itemAmount >= limit) {
            return true;
        }

        return false;
    }

    private limits: Map<string, number> = new Map<string, number>();

    private getSameItemsAmount(item: any, items: any[]): number {

        let amount: number = 0;

        let itemsLength: number = items.length;

        for (let i = 0; i < itemsLength; i++) {
            let appItem: any = items[i];

            if (item.classid === appItem.classid) {
                appItem.id.forEach(id => amount++);
            }
        }

        return amount;
    }

    private registerOverstockLimits(): void {
        this.appConfig.overstockLimits.forEach(limit => {
            this.limits.set(limit.name, limit.value);
        });
    }
}

export let overstockChecker: OverstockChecker = new OverstockChecker(appConfig, appItemsProvider);