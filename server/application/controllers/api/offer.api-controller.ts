import * as express from 'express';

import { offerManager } from '../../services/server-offer-manager';
import ensureAuthenticated from '../../middleware/ensure-authenticated';
import { IOffer } from '../../services/offer-validator/server-offer-validator';

let OfferApiController: express.Router = express.Router();
export default OfferApiController;

OfferApiController.post('/api/new_offer', ensureAuthenticated, (req, res, next) => {

    let offer: IOffer = req.body;
    offer.user.owner = req.user.id;

    offerManager.processOffer(req.user.tradeUrl, offer)
        .then(response => {
            res.status(200).json({ success: true, data: response});
        })
        .catch(err => {
            let reason: string = err.message;

            if (err.eresult === 50) {
                reason = 'You can have no more than 5 open offers with a certain bot, please accept or decline one of them to be able to sent a new offer';
            }

            res.status(200).json({ success: false, reason: reason });
        });
});
