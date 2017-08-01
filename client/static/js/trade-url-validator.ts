class TradeUrlValidator {
    constructor() {
        this.tradeUrlInput = <HTMLInputElement>document.querySelector('.trade-url-input');
        this.tradeUrlButton = <HTMLElement>document.querySelector('.trade-url-btn');
        this.init();
    }

    public subscribe(type: string, func: Function): void {
        this.subscribers[type].push(func);
    }
    public unsubscribe(type: string, func: Function): void {
        let index: number = this.subscribers[type].indexOf(func);
        this.subscribers[type].splice(index, 1);
    }

    public isValid(): boolean {
        return this.valid;
    }

    private init(): void {
        let self = this;
        this.tradeUrlInput.addEventListener('keyup', () => self.validateInput());
        this.tradeUrlButton.addEventListener('click', () => self.setUrl());
        this.validateInput();
    }

    private regEx: RegExp = /^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d{7,}&token=[\d\w]{8}$/gmi;
    private tradeUrlInput: HTMLInputElement;
    private tradeUrlButton: HTMLElement;
    private valid: boolean = false;

    private validateInput(): void {
        let value: string = this.tradeUrlInput.value;

        if (value.match(this.regEx)) {
            this.tradeUrlInput.classList.remove('invalid');
            this.valid = true;
        }
        else {
            this.tradeUrlInput.classList.add('invalid');
            this.valid = false;
        }
    }

    private setUrl(): void {
        if (this.valid) {
            let url: string = this.tradeUrlInput.value;
            this.sendUrl(url);
        }
    }

    private sendUrl(tradeUrl: string): void {
        let self = this;

        let xhr = new XMLHttpRequest();
        xhr.open('post', '/api/user/setTradeUrl', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            if (xhr.status === 200) {
                self.emit('urlSet', null);
            }
            else {
                self.valid = false;
            }
        };

        let body = JSON.stringify({ url: tradeUrl });
        xhr.send(body);
    }

    private emit(type: string, data: any): void {
        this.subscribers[type].forEach(subsriber => subsriber(data));
    }

    private subscribers: { [key: string]: any[]} = {
        urlSet: []
    }
}