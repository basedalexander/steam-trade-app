import request = require('request-promise');
import SteamCommunity = require('steamcommunity');

const steamCommunity = new SteamCommunity();

export interface IInventoryModel {
    findById(id: string): Promise<Object[]>;
}

export class InventoryModel {
    findById(steamId: string): Promise<Object[]> {

        return new Promise<Object[]>((resolve, reject) => {
            steamCommunity.getUserInventory(steamId, 730, 2, 1, (err: Error, inventoryData: Object[]) => {
                if (err) {
                    return reject(err.message);
                }
                resolve(inventoryData);
            });
        });
    }
}

export let inventoryModel: IInventoryModel = new InventoryModel();