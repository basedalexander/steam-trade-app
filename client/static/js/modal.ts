interface ITradeLinkModalConfig {
    maskSelector: string;
    closeBtnSelector: string;
    triggerSelector: string;
}

class TradeLinkModal {
    constructor(config: ITradeLinkModalConfig, validator: TradeUrlValidator) {

        this.triggerElem = <HTMLElement>document.querySelector(config.triggerSelector);
        this.closeBtnElem = <HTMLElement>document.querySelector(config.closeBtnSelector);
        this.modalMaskElem = <HTMLElement>document.querySelector(config.maskSelector);
        this.validator = validator;

        this.init();
    }

    private triggerElem: HTMLElement;
    private closeBtnElem: HTMLElement;
    private modalMaskElem: HTMLElement;
    private validator: TradeUrlValidator;

    private init(): void {
        this.triggerElem.addEventListener('click', () => this.open());
        this.modalMaskElem.addEventListener('click', () => this.close());
        this.closeBtnElem.addEventListener('click', () => this.close());

        let self = this;

        document.addEventListener('keyup', function (e) {
            if (e.keyCode === 27) {
                self.close();
            }
        });

        this.validator.subscribe('urlSet', () => {
            self.close();
        });

        if (!this.validator.isValid()) {
            this.open();
        }
    }

    private open(): void {
        this.modalMaskElem.classList.add('active');
    }
    private close(): void {
        this.modalMaskElem.classList.remove('active');
    }
}

