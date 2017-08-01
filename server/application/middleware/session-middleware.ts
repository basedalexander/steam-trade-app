import * as express from 'express';
import expressSession = require('express-session');
import * as uuid from 'node-uuid';
import * as connectRedis from 'connect-redis';
import { RedisStoreOptions } from 'connect-redis';

let RedisStorage = connectRedis(expressSession);

// todo trusted proxy 1 for production ? google it

export default function session(sessionSecret: string, storeOptions: RedisStoreOptions): express.RequestHandler {
    let sessionOptions = {
        name: 'sid',
        saveUninitialized: true,             // saved new sessions
        resave: true,                        // automatically write to the expressSession store
        cookie : {},                         // configure when sessions expires,
        genid: () => {
            return uuid.v4(); // todo unique id required
        },
        secret: sessionSecret || null,
        store: new RedisStorage({
            host: storeOptions.host,
            port: storeOptions.port
        })
    };

    return expressSession(sessionOptions);
}