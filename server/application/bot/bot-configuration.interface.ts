export interface IBotCredentials {
    accountName: string;
    password: string;
    shared_secret: string;
    identity_secret: string;
    steamID: string;
}

export interface IBotConfig {
    workspace: string;
    tradeOfferManager: {
        domain: string;
        language: string;
        pollInterval: number;
    };
    community: {
        confirmationCheckingInterval: number;
    }
}