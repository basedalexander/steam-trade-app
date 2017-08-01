import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as mongoose from 'mongoose';
import * as http from 'http';

import 'ejs';

import { IServerConfig } from './server-config.interface';
import { logger } from '../application/middleware/logger-middleware';
import errorLogger from '../application/middleware/error-logger-middleware';
import errorHandler from '../application/middleware/error-handler-middleware';
import session from '../application/middleware/session-middleware';
import configurePassport  from '../application/middleware/passport/configure-passport';
import controllers from '../application/controllers/index';
import { io } from './websocket';

export class Server {
    constructor(config: IServerConfig) {
        this.config = config;
        this.setup();
    }

    listen(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.app.listen(this.config.port, () => resolve());
            mongoose.connect(this.config.mongoDB.uri, (err) => {
                if (err) {
                    throw new Error(err.message);
                }
            });
        });
    }

    private setup(): void {
        let app = express();
        app.disable("x-powered-by");
        app.set('port', this.config.port);
        app.set('views', this.config.viewsPath);
        app.set('view engine', 'ejs');

        app.use(logger);
        app.use(errorLogger);
        app.use(errorHandler);

        app.use(express.static(this.config.publicPath));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(session(this.config.session.secret, this.config.redis));

        configurePassport();

        app.use(passport.initialize());
        app.use(passport.session());

        app.use((req, res, next) => {
            next();
        });

        app.use(controllers);

        this.app = http.createServer(app);
        io(this.app);
    }

    private app: http.Server;
    private config: IServerConfig;
}