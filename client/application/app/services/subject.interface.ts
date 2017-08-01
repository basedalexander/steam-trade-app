export interface ISubject {
    subscribe(type: string, func: Function): void;
    unsubscribe(type: string, func: Function): void;
    notifySubscribers(type: string, data: any): void;
}