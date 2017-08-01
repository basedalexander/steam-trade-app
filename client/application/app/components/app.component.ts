import { Component, NgZone } from '@angular/core';
import { UserInventoryProvider } from '../services/user-inventory-provider';
import { AppInventoryProvider } from '../services/app-inventory-provider';
import { IInventoryItem } from './inventory/services/item.interface';
import { ClientOfferManager } from '../services/client-offer-manager';
import { IInventoryChangeData } from '../services/app-inventory-provider';
import { TradeUrlManagerService } from './trade-url-form/trade-url-manager.service';

@Component({
    selector: 'application',
    templateUrl: 'application/app/components/app.component.html',
    styleUrls: [ 'static/css/app.css' ]
})
export class AppComponent {

    constructor(protected userInventoryProvider: UserInventoryProvider,
                protected appInventoryProvider: AppInventoryProvider,
                private offerManager: ClientOfferManager,
                private zone: NgZone,
                private tradeUrlManager: TradeUrlManagerService) {

        window['openTradeUrlForm'] = () => {
            zone.run(() => {
                this.toggleUrlForm();
            });
        };

        this.listenChanges();
    }

    onBotSelect(botId: string): void {
        this.currentBot = botId;
    }

    currentBot: string;

    dealProgressVisible: boolean = false;
    dealIsValid: boolean = false;
    userItemsCost: number = 0;
    appItemsCost: number = 0;

    appItemsCostChanged(cost: number): void {
        this.appItemsCost = cost;
        this.validateDeal();
    }

    userItemsCostChanged(cost: number): void {
        this.userItemsCost = cost;
        this.validateDeal();
    }

    validateDeal(): void {
        this.dealIsValid = this.userItemsCost > this.appItemsCost;
    }

    handleDeal(): void {
        if (!this.dealIsValid) {
            return;
        }

        if (this.tradeUrlManager.has()) {
            this.offerManager.sendOffer(this.userOffer, this.appOffer, this.currentBot);
        }
        else {
            this.toggleUrlForm();
        }
    }

    handleDealChange(): void {
        this.calculate();
        this.validateDeal();
    }

    calculate(): void {
        this.userItemsCost = this.calculateItemsCost(this.userOffer);
        this.appItemsCost = this.calculateItemsCost(this.appOffer);
    }

    calculateItemsCost(items: IInventoryItem[]): number {
        let result = 0;

        items.forEach(item => {
            result += (item.id.length * item.price);
        });

        return +result.toFixed(2);
    }

    userOffer: IInventoryItem[] = [];

    onUserItemSelected(item: IInventoryItem): void {

        let stack: IInventoryItem = this.searchForStack(item, this.userOffer);

        if (!stack) {
            this.userOffer.push(item);
        }
        else {
            let itemId: string = item.id[0];

            stack.id.push(itemId);
        }

        this.userOffer = JSON.parse(JSON.stringify(this.userOffer));

        this.handleDealChange();
    }

    onUserItemUnselected(index: number): void {
        let item: IInventoryItem = this.userOffer[index];

        if (item.id.length === 1) {
            this.userOffer.splice(index, 1);
        }
        else {
            item.id.pop();
        }

        this.userOffer = JSON.parse(JSON.stringify(this.userOffer));

        this.handleDealChange();
    }

    appOffer: IInventoryItem[] = [];

    onAppItemSelected(item: IInventoryItem): void {

        let stack: IInventoryItem = this.searchForStack(item, this.appOffer);

        if (!stack) {
            this.appOffer.push(item);
        }
        else {
            let itemId: string = item.id[0];

            stack.id.push(itemId);
        }

        this.appOffer = JSON.parse(JSON.stringify(this.appOffer));

        this.handleDealChange();
    }

    searchForStack(item: IInventoryItem, collection: IInventoryItem[]): IInventoryItem {
        return collection.find(el => (el.classid === item.classid) && (el.owner === item.owner));
    }

    onAppItemUnselected(index: number): void {
        let item: IInventoryItem = this.appOffer[index];

        if (item.id.length === 1) {
            this.appOffer.splice(index, 1);
        }
        else {
            item.id.pop();
        }

        this.appOffer = JSON.parse(JSON.stringify(this.appOffer));
        this.handleDealChange();
    }

    onOfferSent(): void {
        this.appOffer = [];
        this.userOffer = [];
        this.handleDealChange();
    }

    listenChanges(): void {
        this.appInventoryProvider.listenChanges((change: IInventoryChangeData) => {
            let removedItems = change.removed;

            if (removedItems) {
                removedItems.forEach((removedItem: string) => {
                    let removedItemIndex: number = this.appOffer.findIndex(appItem => appItem.id[0] === removedItem);

                    if (removedItemIndex > -1) {
                        this.appOffer.splice(removedItemIndex, 1);
                    }
                });
            }
        });
    }

    protected urlFormVisible: boolean = false;
    protected tradeUrl: string;

    protected toggleUrlForm(): void {
        this.urlFormVisible = !this.urlFormVisible;
    }
}
