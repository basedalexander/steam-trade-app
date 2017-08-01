import { Component, Output, EventEmitter } from '@angular/core';
import { ClientOfferManager } from '../../services/client-offer-manager';
import { SendOfferResult } from '../../services/client-offer-manager';

export interface ITradeProcessingResult {
    success: boolean;
    details: any;
}

@Component({
    selector: 'offer-progress',
    template: `
    <div class="trade-progress-modal_mask" *ngIf="visible" (click)="close()"></div>
    
    <div class="trade-progress-modal" role="alert" *ngIf="visible">
        <header class='modal-header' [ngClass]="{
            'success': success,
            'failure': failure
        }">
            <span *ngIf='sending' class='modal-header-text'>Processing offer</span>
            <span *ngIf='success' class='modal-header-text'>Offer successfuly sent</span>
            <span *ngIf='failure' class='modal-header-text'>Offer was not sent</span>
            
            <a (click)='close()' class="modal-close-btn">&#10005;</a>
        </header>

        <main class='trade-progress-model-content'>
            
            <!-- Progress indicator -->
            <div *ngIf='sending' class='mod model-3 spinner-section'>
                 <div class="spinner"></div>
            </div>
            
            <!-- Message on sucess -->
            <div *ngIf='success' class="success-message-block">
                <a [attr.href]="offerURL" target="_blank">Your offer link</a>
            </div>
            
            <!-- Message on faillure -->
            <div *ngIf='failure' class="success-message-block">
                <h3 class="offer-failure-text">{{failureReason}}</h3>
            </div>
            
        </main>


        <footer class='modal-footer' *ngIf="success || failure">
        </footer>
    </div>
    `,
    styles: [
        `
    .trade-progress-modal_mask {
      position: fixed;
      display: flex;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1050;
      visibility: visible;
    }
    
    .trade-progress-modal {
      position: fixed;
      width: 45%;
      left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      background: #fff;
      z-index: 4000;
      text-align: center;
    }
    
    .trade-progress-model-content {
      padding: 100px 200px;
    }
    
    .modal-header-text {
      font-size: 1.6em;
      font-weight: bold;
      margin-bottom: 1em;
    }
    
    .modal-header {
        position: relative;;
        background: #fff;
        color: #333;
        border-bottom: 1px solid #333;
        line-height: 60px;
        height: 60px;
    }
    
    .modal-header.success {
        background: #6e861b
    }
    
    .modal-header.failure {
        background: #c13434;
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
    
    .trade-progress-spinner-block {
        margin-bottom: 25px;
    }
    
    .trade-process-close-button {
        border-radius: 2px;
        border: none;
        padding: 0 15px;
        display: inline-block;
        cursor: pointer;
        color: #A4D7F5;
        background: #2f89bc;
        background: -webkit-linear-gradient( top, #2f89bc 5%, #17435c 95%);
        background: linear-gradient( to bottom, #2f89bc 5%, #17435c 95%);
    }
    
    .trade-process-close-button:hover {
        color: #fff;
        background: #66c0f4;
        background: -webkit-linear-gradient( top, #66c0f4 5%, #2f89bc 95%);
        background: linear-gradient( to bottom, #66c0f4 5%, #2f89bc 95%);
    }
    
    .offer-success-text {
        color: forestgreen;
    }
    
    .offer-failure-text {
        color: red;
    }
    
    .spinner-section {
        text-align: center;
    }
        
    .model-3 .spinner {
        display: inline-block;
        background: #fff;
        height: 70px;
        width: 70px;
        border-radius: 0;
        -webkit-animation: rotateRct 1.2s ease-in-out infinite, color-change 1.3s ease-in-out infinite;
        animation: rotateRct 1.2s ease-in-out infinite, color-change 1.3s ease-in-out infinite;
    }
    @-webkit-keyframes spinner-bubble {
      from {
        width: 10px;
        height: 10px;
        opacity: .8;
      }
      to {
        width: 50px;
        height: 50px;
        opacity: 0;
      }
    }
    @keyframes spinner-bubble {
      from {
        width: 10px;
        height: 10px;
        opacity: .8;
      }
      to {
        width: 50px;
        height: 50px;
        opacity: 0;
      }
    }
    @-webkit-keyframes color-bubble {
      0% {
        color: #009DDC;
      }
      33% {
        color: #50B949;
      }
      66% {
        color: #EE2D24;
      }
      100% {
        color: #FEB825;
      }
    }
    @keyframes color-bubble {
      0% {
        color: #009DDC;
      }
      33% {
        color: #50B949;
      }
      66% {
        color: #EE2D24;
      }
      100% {
        color: #FEB825;
      }
    }
    @-webkit-keyframes color-change {
      0% {
        background: #009DDC;
      }
      33% {
        background: #50B949;
      }
      66% {
        background: #EE2D24;
      }
      100% {
        background: #FEB825;
      }
    }
    @keyframes color-change {
      0% {
        background: #009DDC;
      }
      33% {
        background: #50B949;
      }
      66% {
        background: #EE2D24;
      }
      100% {
        background: #FEB825;
      }
    }
    @-webkit-keyframes rotate {
      from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    @keyframes rotate {
      from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    @-webkit-keyframes rotateRct {
      0% {
        -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
        transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      }
      50% {
        -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
        transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      }
      100% {
        -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
        transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      }
    }
    @keyframes rotateRct {
      0% {
        -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
        transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      }
      50% {
        -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
        transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      }
      100% {
        -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
        transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      }
    }
    @-webkit-keyframes size {
      from {
        width: 70px;
        height: 70px;
      }
      to {
        width: 30px;
        height: 30px;
      }
    }
    @keyframes size {
      from {
        width: 70px;
        height: 70px;
      }
      to {
        width: 30px;
        height: 30px;
      }
    }
    @-webkit-keyframes shadow {
      from {
        box-shadow: 0px 0 0 1px inset;
      }
      to {
        box-shadow: 50px 0 0 1px inset;
      }
    }
    @keyframes shadow {
      from {
        box-shadow: 0px 0 0 1px inset;
      }
      to {
        box-shadow: 50px 0 0 1px inset;
      }
    }
    @-webkit-keyframes shadowSize {
      0% {
        box-shadow: 15px 0 0 0, 30px 0 0 0, 45px 0 0 0, 60px 0 0 0, 75px 0 0 0;
      }
      20% {
        box-shadow: 15px 0 0 5px, 30px 0 0 0, 45px 0 0 0, 60px 0 0 0, 75px 0 0 0;
      }
      40% {
        box-shadow: 15px 0 0 0, 30px 0 0 5px, 45px 0 0 0, 60px 0 0 0, 75px 0 0 0;
      }
      60% {
        box-shadow: 15px 0 0 0, 30px 0 0 0, 45px 0 0 5px, 60px 0 0 0, 75px 0 0 0;
      }
      80% {
        box-shadow: 15px 0 0 0, 30px 0 0 0, 45px 0 0 0, 60px 0 0 5px, 75px 0 0 0;
      }
      100% {
        box-shadow: 15px 0 0 0, 30px 0 0 0, 45px 0 0 0, 60px 0 0 0, 75px 0 0 5px;
      }
    }
    @keyframes shadowSize {
      0% {
        box-shadow: 15px 0 0 0, 30px 0 0 0, 45px 0 0 0, 60px 0 0 0, 75px 0 0 0;
      }
      20% {
        box-shadow: 15px 0 0 5px, 30px 0 0 0, 45px 0 0 0, 60px 0 0 0, 75px 0 0 0;
      }
      40% {
        box-shadow: 15px 0 0 0, 30px 0 0 5px, 45px 0 0 0, 60px 0 0 0, 75px 0 0 0;
      }
      60% {
        box-shadow: 15px 0 0 0, 30px 0 0 0, 45px 0 0 5px, 60px 0 0 0, 75px 0 0 0;
      }
      80% {
        box-shadow: 15px 0 0 0, 30px 0 0 0, 45px 0 0 0, 60px 0 0 5px, 75px 0 0 0;
      }
      100% {
        box-shadow: 15px 0 0 0, 30px 0 0 0, 45px 0 0 0, 60px 0 0 0, 75px 0 0 5px;
      }
    }

    `
    ]
})
export class OfferProgress {
    @Output() offerSent: EventEmitter<void> = new EventEmitter<void>();

    constructor(private offerManager: ClientOfferManager) {
        this.resetState();

        this.subscribeForChanges();
    }

    visible: boolean;
    sending: boolean;

    success: boolean;
    offerURL: string;

    failure: boolean;
    failureReason: string;

    private subscribeForChanges(): void {
        this.offerManager.subscribe('sending', () => {
            this.visible = true;
            this.sending = true;
        });

        this.offerManager.subscribe('result', (result: SendOfferResult) => {
            this.sending = false;

            if (result.success) {
                this.success = true;
                this.offerURL = `https://steamcommunity.com/tradeoffer/${result.data.offerId}`;
                this.offerSent.emit(null);
            }
            else {
                this.failure = true;
                this.failureReason = result.reason;
            }
        });

        this.offerManager.subscribe('serverError', (reason: string) => {
            this.sending = false;
            this.failure = true;
            this.failureReason = reason;
        })
    }

    private resetState(): void {
        this.visible = false;
        this.sending = false;

        this.success = false;
        this.offerURL = null;

        this.failure = false;
        this.failureReason = null;
    }

    protected close(): void {
        this.resetState();
    }
}