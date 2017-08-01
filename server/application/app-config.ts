export interface IAppConfig {
    blacklistedItems: string[];
    overstockLimits: { name: string; value: number }[];
    lowestPrice: number;
}

export const appConfig: IAppConfig = require('./app-config.json');