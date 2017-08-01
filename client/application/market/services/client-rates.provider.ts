import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

export type RateInfo = {
    name: string;
    user: number;
    bot: number;
}

const api: string = `/api/rates`;

@Injectable()
export class ClientRatesProvider {
    constructor(private http: Http) {
        this.load();
    }

    load(): void {
        this.http.get(api)
            .subscribe(
                result => {
                    this._rates = result.json();
                },
                err => {
                    throw new Error(err.message);
                }
            );
    }

    get rates(): RateInfo[] {
        return this._rates;
    }

    private _rates: RateInfo[];
}