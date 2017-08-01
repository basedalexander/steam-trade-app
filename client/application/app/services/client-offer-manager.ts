import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { IInventoryItem } from '../components/inventory/services/item.interface';
import { ISubject } from './subject.interface';

import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { OfferConverterService } from './offer-converter.service';
import { IOffer } from './offer-converter.service';

const api = {
    sendDeal: '/api/new_offer'
};

export type SendOfferResult = {
    success: boolean;
    data: {
        offerId: string;
    };
    reason?: string;
}

@Injectable()
export class ClientOfferManager implements ISubject {
    constructor(private http: Http, private offerConverterService: OfferConverterService) { }

    sendOffer(userOffer: IInventoryItem[], appOffer: IInventoryItem[], currentBot: string): void {

        this.notifySubscribers('sending');

        let offer: IOffer = this.offerConverterService.convert(userOffer, appOffer, currentBot);

        this.http.post(api.sendDeal, offer)
            .timeout(215000)
            .subscribe(
                result => {
                    this.notifySubscribers('result', result.json());
                },
                reason => {
                    this.notifySubscribers('serverError', reason);
                }
            );
    }

    subscribe(type: string, cb: Function): void {
        if (!this.events[type]) {
            this.events[type] = [];
        }

        this.events[type].push(cb);
    }

    unsubscribe(type: string, cb: Function): void {
        if (this.events[type]) {

            let index: number = this.events[type].indexOf(cb);

            if (index !== -1) {
                this.events[type].splice(index, 1);
            }
        }
    }

    notifySubscribers(type: string, data?: any): void {
        this.events[type].forEach(cb => cb(data));
    }

    private events: { [key: string]: Function[]} = {};


}