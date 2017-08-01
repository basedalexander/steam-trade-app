import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { IInventoryProvider } from './inventory.provider.interface';
import { IInventoryRequestResult } from './inventory.provider.interface';

@Injectable()
export class UserInventoryProvider implements IInventoryProvider {
    constructor(private http: Http) {
    }

    get(): Promise<IInventoryRequestResult> {
        return new Promise<IInventoryRequestResult>((resolve, reject) => {
            return this.http.get(this.endpoint)
                .subscribe(
                    result => {
                        resolve(result.json());
                    },
                    () => {
                        reject();
                    }
                )
        });
    }

    listenChanges(listener: Function) {
    }

    private endpoint: string = '/api/list_user_inventory';
}