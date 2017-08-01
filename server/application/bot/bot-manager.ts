import { IBotCredentials } from './bot-configuration.interface';
import { Bot } from './bot';
import { botConfig } from './bot-configuration';

let botsCredentials = require('./bots-credentials.json');

export type identityType = string;

export class BotManager {
    constructor( private botsCredentials: IBotCredentials[]) {
        this.init();
    }

    getBot(id: string): Bot {
        return this.bots.get(id);
    }

    getBotsIds(): string[] {
        let ids: string[]= [];
        this.bots.forEach((botObject, steamId) => ids.push(steamId));
        return ids;
    }

    // TODO search for free space in backpacks
    getBotWithFreeSlots(freeSlotsRequired: number): string {
        return this.getBotsIds()[0];
    }

    private init(): void {
        this.botsCredentials.forEach(cred => {
            let newBot: Bot = new Bot(cred, botConfig);
            this.registerBot(cred.steamID, newBot);
        });
    }

    private registerBot(id: identityType, bot: Bot): void {
        this.bots.set(id, bot);
    }

    private bots: Map<identityType, Bot> = new Map<identityType, Bot>();
}

export let botManager = new BotManager(botsCredentials);