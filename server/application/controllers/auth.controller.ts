import * as express from 'express';
import * as passport from 'passport';

import { User } from '../models/user';

let AuthController: express.Router = express.Router();
export default AuthController;

AuthController.use((req, res, next) => {
    req.url = req.originalUrl;
    next();
});

AuthController.get('/auth/steam',
    passport.authenticate('steam', { failureRedirect: '/' }),
    (req, res) => res.redirect('/')
);

AuthController.get('/auth/steam/return',
    passport.authenticate('steam', { failureRedirect: '/' }),
    (req, res, next) => {

        User.findOne({ steamID: req.user.id }, (err, existingUser: any) => {
            if (err) {
                return next(err);
            }

            if (existingUser) {
                (<any>req).session.passport.user.tradeUrl = existingUser.tradeUrl;
                res.redirect('/');
            }
            else {
                let newUser = new User();
                newUser['steamID'] = req.user.id;
                newUser.save(err => {
                    if (err) {
                        return next(err);
                    }

                    res.redirect('/');
                })
            }
        });
    }
);

AuthController.get('/auth/logout', function(req, res){
    req.logout();
    res.redirect('/');
});