declare module 'passport-steam' {
    interface IOptions {
        returnURL: string;
        realm: string;
        apiKey: string;
    }
    export function Strategy(options: IOptions, func: (identifier, profile, done) => void): void
}