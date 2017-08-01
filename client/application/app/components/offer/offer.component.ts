import { Component, Output, EventEmitter, Input } from '@angular/core';
import { IInventoryItem } from '../inventory/services/item.interface';

@Component({
    moduleId: module.id,
    selector: 'offer',
    templateUrl: './offer.component.html'
})
export class OfferComponent {
    @Input() items: IInventoryItem[];

    @Output() itemClick: EventEmitter<number> = new EventEmitter<number>();

    get cost(): number {
        let result = 0;

        this.items.forEach(item => {
            result += (item.price * item.id.length);
        });

        return +result.toFixed(2);
    }

    onItemClick(item: IInventoryItem): void {
        let index: number = this.items.findIndex(i => i.id[0] === item.id[0]);
        this.itemClick.emit(index);
    }

    getItemsAmount(): number {
        let result = 0;

        this.items.forEach(item => {
            result = result + item.id.length;
        });

        return result;
    }
}