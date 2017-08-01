export class Offer {
    constructor(userOffer: any[], appOffer: any[]) {
        this.appOffer = appOffer;
        this.userOffer = userOffer;
    }
    userOffer: any[];
    appOffer: any[]; //todo types
}