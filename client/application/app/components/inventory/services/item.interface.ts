export interface ITagDescription {
    category: string;
    category_name: string;
    internal_name: string;
    name: string;
}

export interface IIItemCategory {
   acronym: string;
    fullName: string;
    color: string;
}

export interface IInventoryItem {
    amount: number;
    assetid: string;
    category: IIItemCategory;
    classid: string;
    collection: string;
    commodity: string;
    exterior: IIItemCategory;
    icon_url: string;
    icon_url_large: string;
    id: string[];
    actions: any;
    market_actions: any;
    instanceid: string;
    market_hash_name: string;
    market_marketable_restrictions: number;
    market_name: string;
    market_tradable_restriction: number;
    marketable: boolean;
    name: string;
    name_color: string;
    pos: number;
    price: number;
    quality: IIItemCategory;
    tags: ITagDescription[],
    tradable: boolean;
    type: IIItemCategory;
    weapon: IIItemCategory;
    owner: string;
}