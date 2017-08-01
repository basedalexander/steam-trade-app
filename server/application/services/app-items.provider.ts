import { inventoryModel, InventoryModel } from '../models/inventory';
import { inventoryParser, InventoryParser } from './inventory-parser';
import { botManager, BotManager } from '../bot/bot-manager';
import { ws } from '../../startup/websocket';

export class AppItemsProvider {
    constructor(private inventoryModel: InventoryModel,
                private botManager: BotManager,
                private csgoItemsParser: InventoryParser) {
        this.init();
    }

    get(): any[] {
        return this.items;
    }

    getById(id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let index = this.items.findIndex(item => item.id === id);
            if (index > -1) {
                resolve(this.items[index]);
            }
            else {
                reject();
            }
        });
    }

    remove(itemsToRemove: IEconItem[]): void {

        itemsToRemove.forEach(itemToRemove => {
            let index = this.items.findIndex(item => {

                return (item.classid === itemToRemove.classid) &&
                       (item.id.includes(itemToRemove.id));
            });

            if (index > -1) {

                let stack: any = this.items[index];

                if (stack.id.length === 1) {
                    this.items.splice(index, 1);
                }
                else {
                    stack.id = stack.id.filter(id => id !== itemToRemove.id);
                }
            }
            else {
                console.error(`Can't find and remove the item with id ${itemToRemove.id}`);
            }
        });

        ws.emit('items_removed', itemsToRemove.map(item => item.id));
    }

    add(items: any[], owner: string): void {

        if (!items.length) {
            return;
        }

        this.inventoryModel.findById(owner)
            .then((freshInventory: IEconItem[]) => {

                let oldBotItems: IEconItem[] = this.items.filter(item => item.owner === owner);

                let newItems: any[] = freshInventory.filter(freshItem => {
                    let foundItem = oldBotItems.find(item => item.id.includes(freshItem.id));
                    return !foundItem;
                });

                let addedItems: any[] = [];

                newItems.forEach(newItem => {
                    let stack: any = this.items.find(item => (item.classid === newItem.classid) && (item.owner === owner));

                    if (stack) {
                        stack.id.push(newItem.id);
                        addedItems.push(stack);
                    }
                    else {
                        let parsedNewItem: any;
                        try {
                            parsedNewItem = inventoryParser.parseBotInventory([newItem], owner);
                            parsedNewItem = parsedNewItem[0];
                        }
                        catch (e) {
                            void e;
                        }
                        this.items.push(parsedNewItem);
                        addedItems.push(parsedNewItem);
                    }
                });

                //emit addedItems
                ws.emit('items_added', addedItems);
            });
    }

    private init(): void {
        let botsIds: string[] = this.botManager.getBotsIds();
        let promises = botsIds.map(id => this.inventoryModel.findById(id));

        Promise.all(promises)
            .then(inventories => {
                inventoryParser.parseMany(inventories, botsIds)
                    .then(items => {
                        this.items = items;
                    })
                    .catch(err => {
                        throw new Error(err.message);
                    });
            })
            .catch(err => {
                throw new Error(err.message);
            });
    }

    private items: IEconItem[];
}

export let appItemsProvider = new AppItemsProvider(inventoryModel, botManager, inventoryParser);

