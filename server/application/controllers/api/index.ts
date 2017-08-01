import * as express from 'express';

import InventoryApiController from './inventory.api-controller';
import OfferApiController from './offer.api-controller';
import RatesApiController from './rates.api-controller';
import UserApiController from './user.api-controller';

let ApiController: express.Router = express.Router();
export default ApiController;


ApiController.use(InventoryApiController);
ApiController.use(OfferApiController);
ApiController.use(RatesApiController);
ApiController.use(UserApiController);