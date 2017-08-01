declare module 'steam-totp' {
    export function generateAuthCode(sharedSecret: string): string;
    export function getConfirmationKey(identitySecret: string, time: number, tag: any): string;
}