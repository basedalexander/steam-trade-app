import * as express from 'express';

import { User, IUserModel } from '../../models/user';
import ensureAuthenticated from '../../middleware/ensure-authenticated';

let UserApiController: express.Router = express.Router();
export default UserApiController;


UserApiController.get('/api/trade_url', ensureAuthenticated, (req, res, next) => {
    if (!req.user) {
        return res.status(401).send();
    }

   res.json({ tradeUrl: req.user.tradeUrl});
});

UserApiController.post('/api/trade_url', ensureAuthenticated, (req, res, next) => {
    if (!req.user) {
       return res.status(401).send();
    }

    User.findOne({ tradeUrl: req.body.url }, (err, foundUser: IUserModel) => {
        if (err) {
            return next(err);
        }

        if (foundUser && foundUser.steamID !== req.user.id) {
            return res.status(403).send('Someone is using this trade url already');
        }
        else {
            User.findOneAndUpdate({steamID: req.user.id }, { $set: { tradeUrl: req.body.tradeUrl }}, (err, existingUser: any) => {
                if (err) {
                    return next(err);
                }

                (<any>req).session.passport.user.tradeUrl = req.body.tradeUrl;
                res.status(200).send();
            });
        }
    });
});

UserApiController.get('/api/status', (req, res, next) => {
    if (!req.user) {
        res.json({ status: false });
    }
    else {
        res.json({ status: true });
    }
});