export interface IServerConfig {
    domain: string;
    port: number;
    apiKey: string;
    viewsPath: string;
    publicPath: string;
    adminClientPath: string;
    session: {
        secret: string;
    },
    mongoDB: {
        uri: string;
    },
    redis: {
        host: string;
        port: number;
    },
    botsWorkspace: string;
}