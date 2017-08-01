import { Component, Output, EventEmitter } from '@angular/core';
import { TradeUrlManagerService } from './trade-url-manager.service';

@Component({
    selector: `trade-url-form`,
    template: `
    <div class="modal-mask" (click)="notifyClosed()"></div>

    <div class="modal" role="alert">
        <header class='modal-header'>
            <span class='modal-header-text'>Your trade url</span>
            <a (click)='notifyClosed()' class="modal-close-btn">&#10005;</a>
        </header>

        <main class='modal-content'>
             <section class="trade-url-form">
             
                <div class="url-hint-link-block">
                    <a class='url-hint-link' href="http://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url" target="_blank">Take it here </a>
                </div>

                <div class="wrapper">
                    <div class="trade-url-input-label-container">
                        <span class='trade-url-input-label-text'>trade-offer url</span>
                    </div>
            
                    <div class="trade-url-input-container">
                        <input
                            class='trade-url-input'
                            [class.valid]='touched && valid'
                            [class.invalid]="touched && !valid"
                            #input
                            [value]="tradeUrl"
                            (keyup)="onInputChange(input.value)"
                            type="text"
                            placeholder='https://steamcommunity.com/tradeoffer/new/?partner=...'
                            autocomplete="off"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            />
                    </div>
                </div>
            
                <div class="submit-button-container">
                    <a [class.disabled]='(!valid) || !touched' class='submit-button' (click)="onSubmit()">update</a>
                </div>
            
            </section>
        </main>
    </div>
    `,
    styles: [
        `
    .modal-mask {
      position: fixed;
      display: flex;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 350;
      visibility: visible;
    }
    
    .modal {
      position: fixed;
      width: 45%;
      left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      background: #fff;
      z-index: 1000;
      text-align: center;
    }
    
    .modal-content {
        width: 100%;
        padding: 100px 0;
    }
    
    .modal-header-text {
      font-size: 1.6em;
      font-weight: bold;
      margin-bottom: 1em;
    }
    
    .modal-header {
    position: relative;
    font-family: monospace;
    background: #fff;
    color: #333;
    line-height: 60px;
    height: 60px;
    border-bottom: 1px solid #333;
    }
    
    .modal-close-btn {
        position: absolute;
        top: -1px;
        right: 30px;
        text-align: center;
        display: block;
        width: 2px;
        height: 2px;
        z-index: 600;
        font-size: 20px;
        cursor: pointer;
    }
    .modal-close-btn:hover {
        color: #000;
    }
    
    .modal-footer {
        padding: 10px 0;
    }
    

    .trade-url-form {
      width: 80%;
      margin: 0 auto;
    }
    
    .wrapper {
      border: 1px solid #333;
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 30px;
    }
    
    .trade-url-input-label-container {
      float: left;
      width: 40%;
      height: 47px;
      line-height: 47px;
      text-align: center;
      border-right: 1px solid #333;
    }
    
    .trade-url-input-label-text {
      text-transform: uppercase;
      font-weight: bold;
      text-align: center;
      display: block;
      width: 100%;
    }
    
    .trade-url-input-container {
      width: 60%;
      float: right;
      height: 47px;
      line-height: 47px;
    }
    
    .trade-url-input {
      resize: none;
      width: 100%;
      height: 47px;
      padding: 12px;
      font-family: monospace;
      word-wrap: none;
    }
    
    .invalid {
        box-shadow: inset -1px 0 8px 2px rgba(242,46,62,0.92);
    }
    .valid {
    box-shadow: inset -1px 0 8px 2px rgba(4, 113, 32, 0.92);
    }
    
    .submit-button-container {
      text-align: center;
    }
    
    .submit-button {
      display: inline-block;
      padding: 9px;
      border: 1px solid #333;
      border-radius: 2px;
      font-weight: bold;
      color: #333;
      text-transform: uppercase;
      cursor: pointer;
    }
    .submit-button:hover {
      text-decoration: none;
      color: #fff;
      background: #333;
      cursor: pointer;
    }
    
    .submit-button.disabled {
        color: #9d9d9d;
        border-color: #9d9d9d;
        cursor: default;
    }
    .submit-button.disabled:hover {
        color: #9d9d9d;
        background-color: #fff;
        cursor: default;
    }
    
    .url-hint-link-block {
        margin-bottom: 20px;
    }
    .url-hint-link {
        color: #333f9c;
        text-decoration: none;
    }
    .url-hint-link:hover {
        text-decoration: underline;
    }
    .url-hint-link:visited { color: #333f9c; }
    .url-hint-link:hover { color: #333f9c; }
    .url-hint-link:active { color: #333f9c; }
    `
    ]
})
export class TradeUrlFormComponent {
    @Output() closed: EventEmitter<void> = new EventEmitter<void>();

    constructor(private tradeUrlManager: TradeUrlManagerService) {

    }

    ngOnInit(): void {
        this.tradeUrl = this.tradeUrlManager.get() || '';

        if (!this.tradeUrl) {
            this.validateUrl();
        }
    }

    tradeUrl: string = '';
    valid: boolean = true;
    touched: boolean = false;

    protected notifyClosed(): void {
        this.closed.emit(null);
    }

    protected onInputChange(value: string): void {
        this.tradeUrl = value;
        this.touched = true;
        this.validateUrl();
    }

    protected onSubmit(): void {
        // todo serverside validation
        if (this.valid) {
            this.tradeUrlManager.set(this.tradeUrl)
                .then(() => {
                    this.touched = false;
                    this.valid = true;
                })
                .catch(() => {
                    // todo show error;
                })
        }
    }

    private validateUrl(): void {
        if (this.tradeUrl) {
            this.valid = this.tradeUrlManager.validate(this.tradeUrl);
        }
        else {
            this.valid = false;
        }
    }
}