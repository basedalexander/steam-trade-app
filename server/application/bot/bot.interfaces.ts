export interface IBotLoginOptions {
    accountName: string;
    password: string;
    twoFactorCode: string;
    steamguard?: string;
}

export interface IBotPendingtOffer {
    offer: any;
    resolve: Function;
    reject: Function;
}
