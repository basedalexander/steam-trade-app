import * as express from 'express';

import DefaultController from './default.controller';
import AuthController from './auth.controller';
import ApiController from './api/index';

import { botManager } from '../bot/bot-manager';

let controllers: express.Router = express.Router();
export default controllers;

controllers.use(function (req, res, next) {
    res.locals.user = req.user;
    res.locals.bots = botManager.getBotsIds();
    next();
});

// todo
controllers.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

controllers.use(AuthController);
controllers.use(DefaultController);
controllers.use(ApiController);
