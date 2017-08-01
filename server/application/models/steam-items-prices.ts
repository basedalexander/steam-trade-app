import request = require('request-promise');

export interface ICSGOPricesResult {
    [key: string]: any;
}

const api = {
    csgofast: 'https://api.csgofast.com/price/all'
};

export class CsgoItemPrices {

    get(): ICSGOPricesResult {
        return this.cache;
    }

    load(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            request(api.csgofast)
                .then(data => {
                    this.cache = JSON.parse(data);
                    resolve();
                })
                .catch(err => {
                    reject(err.message);
                });
        });
    }

    private cache: ICSGOPricesResult = null;
}

export let csgoPrices = new CsgoItemPrices();