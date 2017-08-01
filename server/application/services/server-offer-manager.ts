import { botManager, BotManager } from '../bot/bot-manager';
import { IOffer, serverOfferValidator } from './offer-validator/server-offer-validator';
import { ServerOfferValidator } from './offer-validator/server-offer-validator';
import { Bot } from '../bot/bot';
import { IConvertedOffer } from './offer-validator/server-offer-validator';

export type ProcessOfferResult = {
    offerId: string;
}

export class ServerOfferManager {
    constructor(private botManager: BotManager, private offerValidator: ServerOfferValidator) {
    }

    public processOffer(tradeUrl: string, offer: IOffer): Promise<ProcessOfferResult> {

        offer.app.owner = <string>this.getBotOwner(offer.app);

        return new Promise<ProcessOfferResult>((resolve, reject) => {

            this.offerValidator.validate(offer)
                .then(() => {
                    this.delegateToBot(tradeUrl, offer)
                        .then(offerId => {
                            resolve({
                                offerId: offerId
                            })
                        })
                        .catch(reason => {
                            reject(reason);
                        });
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    private getBotOwner(appOffer: IConvertedOffer): string {
        return (appOffer.owner || botManager.getBotWithFreeSlots(appOffer.items.length));
    }

    private delegateToBot(tradeUrl: string, offer: IOffer): Promise<string> {
        let botId: string = offer.app.owner;
        let bot: Bot = this.botManager.getBot(botId);

        return bot.handleOffer(tradeUrl, offer.user.items, offer.app.items);
    }
}

export let offerManager = new ServerOfferManager(botManager, serverOfferValidator);