import { Component } from '@angular/core';
import { ClientRatesProvider, RateInfo } from '../services/client-rates.provider';

@Component({
    selector: 'market-rates',
    template: `
    <div class="trade-window">
        <header class="trade-window-header">
            <div class="trade-window-header-item market-rates-title">
                <span class="trade-window-header-text">market rates</span>
            </div>
        </header>

        <div class="market-rates_data">
        
            <div *ngFor='let rate of rates' class="market-item-group">
                <span class="market-item-name" >{{rate.name}} :</span>
                <div class="market-item_rates">
                    <span class="market-item_rate-min">{{rate.user}} %</span> |
                    <span class="market-item_rate-max">{{rate.bot}} %</span>
                </div>
            </div>
        </div>

    </div> <!-- market rates ends -->
    `

})
export class MarketRatesComponent {
    constructor(private clientRatesProvider: ClientRatesProvider) {}

    get rates(): RateInfo[] {
        return this.clientRatesProvider.rates;
    }
}