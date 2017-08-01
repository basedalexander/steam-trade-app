import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MarketRatesComponent } from './components/market-rates.component';
import { ClientRatesProvider } from './services/client-rates.provider';

@NgModule({
    imports: [
        BrowserModule
    ],
    exports: [
        MarketRatesComponent
    ],
    declarations: [
        MarketRatesComponent
    ],
    providers: [ClientRatesProvider]
})
export class MarketModule { }
