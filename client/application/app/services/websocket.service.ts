import { Injectable } from '@angular/core';

@Injectable()
export class WebsocketService {
    constructor() {
        this.ws = io.connect(location.origin);
    }

    on(eventName: string, listener: Function): void {
        this.ws.on(eventName, listener);
    }

    public ws: any;
}