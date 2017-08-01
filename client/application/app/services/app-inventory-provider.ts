import { Injectable } from '@angular/core';

import { IInventoryProvider } from './inventory.provider.interface';
import { Http } from '@angular/http';
import { IInventoryItem } from '../components/inventory/services/item.interface';
import { WebsocketService } from './websocket.service';
import { IInventoryRequestResult } from './inventory.provider.interface';

export interface IInventoryChangeData {
    added: IInventoryItem[];
    removed: string[];
}

@Injectable()
export class AppInventoryProvider implements IInventoryProvider {
    constructor(private http: Http,
                private ws: WebsocketService) {
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

    listenChanges(listener: (changeData: IInventoryChangeData) => void) {
        this.ws.on('items_removed', (items: string[]) => {
            listener({ added: null, removed: items});
        });


        this.ws.on('items_added', (items: IInventoryItem[]) => {
            listener({ added: items, removed: null})
        });
    }

    private endpoint: string = '/api/list_inventory';
}