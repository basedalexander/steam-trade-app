import { CsgoItemPrices, csgoPrices } from '../../models/steam-items-prices';
import { EItemOwnerType } from './owner-type.enum';
import { rateProvider, RateProvider } from './rate.provider';
import './rate-rules/index';
import { IAppConfig } from '../../app-config';
import { appConfig } from '../../app-config';

export class PriceProvider {

    constructor(
        private csgoPrices: CsgoItemPrices,
        private rateProvider: RateProvider,
        private appConfig: IAppConfig) {

        this._lowestPrice = appConfig.lowestPrice;
    }

    get lowestPrice(): number {
        return this._lowestPrice
    }

    set lowestPrice(value: number) {
        this._lowestPrice = value;
    }

    getPrice(item: any, ownerType: EItemOwnerType): number {

        let pricesTable: { [key: string]: number } = this.csgoPrices.get();

        let price: number = pricesTable[item.market_hash_name];

        if (!price) {
            return undefined;
        }

        let rate: number = this.rateProvider.get(item, ownerType);

        if (rate) {
            price = price * rate;
        }

        price = this.round(price);

        return price;
    }

    private _lowestPrice: number;

    private round(price: number): number {
        return +(price.toFixed(2));
    }
}

export let priceProvider = new PriceProvider(csgoPrices, rateProvider, appConfig);