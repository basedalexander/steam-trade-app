import * as express from 'express';
import { inventoryModel } from '../../models/inventory';
import { inventoryParser } from '../../services/inventory-parser';
import { appItemsProvider } from '../../services/app-items.provider';
import ensureAuthenticated from '../../middleware/ensure-authenticated';
import { botManager } from '../../bot/bot-manager';

let InventoryApiController: express.Router = express.Router();
export default InventoryApiController;

InventoryApiController.get('/api/list_inventory', (req, res, next) => {

    let result: Object = {
        owners: botManager.getBotsIds(),
        items: appItemsProvider.get()
    };

    res.json(result);
});

InventoryApiController.get('/api/list_user_inventory', ensureAuthenticated, (req, res, next) => {
    inventoryModel.findById(req.user.id)
        .then(inventory => {
            let parsedItems: any[] = inventoryParser.parseUserInventory(inventory, req.user.id);

            res.json({
                items: parsedItems
            });
        })
        .catch(err => {
            res.json([]);
        });
});