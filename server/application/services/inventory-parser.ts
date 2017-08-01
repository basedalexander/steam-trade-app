import { PriceProvider, priceProvider } from './price-provider/price.provider';
import { EItemOwnerType } from './price-provider/owner-type.enum';
import { BlacklistService } from './black-list-checker/blacklist.service';
import { blacklistService } from './black-list-checker/blacklist.service';
import { OverstockChecker, overstockChecker } from './overstock-checker/overstock-checker';

export class InventoryParser {

    constructor(
        private priceProvider: PriceProvider,
        private blacklistService: BlacklistService,
        private overstockChecker: OverstockChecker
    ) {
    }

    parseMany(inventories: Array<any[]>, owners: string[]): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {

            let items: any[] = [];

            for (let inventoryIndex = 0; inventoryIndex < inventories.length; inventoryIndex++) {
                let inventory: any[] = inventories[inventoryIndex];

                let owner: string = owners[inventoryIndex];

                let parsedInventory: any[] = this.parseBotInventory(inventory, owner);

                items = items.concat(parsedInventory);
            }
            resolve(items);
        });
    }

    parseBotInventory(inventory: any[], owner: string): any[] {

        let length: number = inventory.length;

        let parsedInventory: any[] = [];

        for (let itemIndex = 0; itemIndex < length; itemIndex++) {
            let item = inventory[itemIndex];
            let stack: any = this.findStack(parsedInventory, item);

            if (stack) {
                stack.id.push(item.id);
            }
            else {
                this.cleanUp(item);
                this.parseTags(item);
                this.parseStickers(item);

                item.id = [item.id];
                item.owner = owner;
                item.price = this.priceProvider.getPrice(item, EItemOwnerType.Bot);

                parsedInventory.push(item);
            }
        }
        return parsedInventory;
    }

    parseUserInventory(inventory: any[], owner: string): any[] {

        let length: number = inventory.length;
        let parsedInventory: any[] = [];

        for (let itemIndex = 0; itemIndex < length; itemIndex++) {

            let item = inventory[itemIndex];

            // TODO complex logics below

            let overstock: boolean = this.overstockChecker.check(item, parsedInventory);

            if (overstock) {
                item.overstock = true;
                item.unavailable = true;
            }

            let overstockStack: any = this.findOverstockStack(parsedInventory, item);
            let stack: any = this.findStack(parsedInventory, item);

            if (overstockStack) {
                overstockStack.id.push(item.id);
            }

            else if (!overstock && stack) {
                stack.id.push(item.id);
            }

            else {
                this.cleanUp(item);
                this.parseTags(item);
                this.parseStickers(item);

                item.id = [item.id];
                item.owner = owner;
                item.price = this.priceProvider.getPrice(item, EItemOwnerType.User);

                let unavailable: boolean = this.blacklistService.checkItem(item, parsedInventory);

                if (unavailable || !item.price) {
                    item.unavailable = true;
                }

                parsedInventory.push(item);
            }
        }
        return parsedInventory;
    }

    private findStack(inventory: any[], item: any): any {
        return inventory.find(checkItem => {
            let overstockItemStock: boolean = (checkItem.classid === item.classid) && (checkItem.unavailable && item.unavailable);
            let sameClassId: boolean = checkItem.classid === item.classid;

            return overstockItemStock || sameClassId;
        });
    }

    private findOverstockStack(inventory: any[], item: any): any {
        return inventory.find(checkItem => {
            let overstockItemStock: boolean = (checkItem.classid === item.classid) && (checkItem.unavailable && item.unavailable);

            return overstockItemStock;
        });
    }

    private cleanUp(item: any): void {
        delete item.name;
        delete item.pos;
        delete item.amount;
        delete item.instanceid;
        delete item.assetid;
        delete item.market_name;
        delete item.actions;
        delete item.market_actions;
        delete item.icon_url_large;
        delete item.icon_drag_url;
    }

    private parseTags(item: any): void {
        item.tags.forEach(tag => {
            let categoryName: string = (tag.category_name).toLowerCase();
            item[categoryName] = {
                acronym: this.getAcronym(tag.name),
                fullName: tag.name,
                color: tag.color
            }
        });

        delete item.tags;
    }

    private parseStickers(item: any): void {
        if (!item.descriptions) {
            return;
        }

        let i: number;
        let len: number = item.descriptions.length;
        for (i = 0; i < len; i++) {
            let desc = item.descriptions[i];

            if (/</gm.test(desc.value)) {
                item.stickers = desc.value.match(/https:\/\/.*?\.png/img);
            }
        }

        delete item.descriptions;
    }

    private getAcronym(categoryName: string): string {
        let result: string = categoryName.replace(/-/gim, ' ');
        result = result
            .split(' ')
            .map((word: string) => word.trim()[0])
            .join('');
        return result;
    }
}

export let inventoryParser = new InventoryParser(priceProvider, blacklistService, overstockChecker);