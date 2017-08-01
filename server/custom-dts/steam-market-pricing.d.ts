declare module 'steam-market-pricing' {
    export function getItemPrice(
        appid: number,
        name: string,
        callback: (err: Error, data: any) => void,
        currency: number
    ): void;

    export function getItemsPrice(
        appid: number,
        names: string[],
        callback: (err: Error, data: any) => void,
        currency: number
    ): void;
}