import * as express from 'express';

import { rateProvider } from '../../services/price-provider/rate.provider';

let RatesApiController: express.Router = express.Router();
export default RatesApiController;

RatesApiController.get('/api/rates', (req, res, next) => {
    res.json(rateProvider.getAll());
});