declare interface IEconItem {
    id: string;
    assetid: string;
    contextid: number;
    appid: number;
    classid: string;
    instanceid: string;
    amount: number;
    pos: number;
    name: string;
    name_color: string;
    background_color: string;
    type: string;
    tradable: boolean;
    marketable: boolean;
    commondity: boolean;
    market_tradable_restriction: number;
    market_marketable_restriction: number;
    owner: string;
}