import * as path from 'path';

import { enviroment } from './enviroment';
import { IServerConfig } from './server-config.interface';

export class ServerConfiguration {
    constructor() {
        let config = require(`../server-${enviroment.get()}-config.json`);

        this.config = {
            domain: config.domain,
            apiKey: config.apiKey,
            port: process.env.PORT || config.port,
            viewsPath: path.resolve(__dirname, '../', config.viewsPath),
            publicPath: path.resolve(__dirname, '../', config.publicPath),
            adminClientPath: path.resolve(__dirname, '../', config.adminClientPath),
            session: config.session,
            mongoDB: config.mongoDB,
            redis: config.redis,
            botsWorkspace: path.resolve(__dirname, '../', config.botsWorkspace)
        }
    }

    public get(): IServerConfig {
        return this.config;
    }

    config: IServerConfig;
}

export let serverConfiguration = new ServerConfiguration();