import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

type TradeUrlResponse = {
    tradeUrl: string;
}

const apiUrl = '/api/trade_url';

@Injectable()
export class TradeUrlManagerService {
    constructor(private http: Http) {
        this.init();
    }

    get(): string {
        return this.tradeUrl;
    }

    has(): boolean {
        return !!this.tradeUrl;
    }

    set(url: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.update(url)
                .then(() => {
                    this.tradeUrl = url;
                    resolve();
                })
                .catch(() => {
                    reject();
                });

        });
    }

    validate(url: string): boolean {
        return this.urlRegexp.test(url);
    }

    private update(url: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.http.post(apiUrl, { tradeUrl: url })
                .subscribe(
                    (result) => {
                        resolve();
                    },
                    (err) => {
                        reject();
                    }
                )
        });
    }

    private init(): void {
        this.load();
    }

    private load(): void {
        this.http.get(apiUrl)
            .subscribe(
                result => {
                    let json: TradeUrlResponse = result.json();

                    if (json.tradeUrl) {
                        this.tradeUrl = json.tradeUrl;
                    }
                    else {
                        this.tradeUrl = null;
                    }
                }
            );
    }

    private tradeUrl: string;

    private urlRegexp: RegExp = /^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d{7,}&token=[\d\w]{8}$/i;

}