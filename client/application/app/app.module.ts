import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './components/app.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { LoadIndicatorComponent } from './components/inventory/load-indicator/load-indicator.component';
import { CommonModule } from '../common/common.module';
import { MarketModule } from '../market/market.module';
import { AppInventoryProvider } from './services/app-inventory-provider';
import { UserInventoryProvider } from './services/user-inventory-provider';
import { InventoryFilterComponent } from './components/inventory/filter/inventory-filter.component';

import { INVENTORY_FILTERS } from './components/inventory/services/filters/filters';

import { InventoryFiltersRegister } from './components/inventory/services/filters/inventory-filters-register';
import { InventoryFilterService } from './components/inventory/services/filters/inventory-filter.service';
import { InventorySearchService } from './components/inventory/services/inventory-search.service';
import { OfferComponent } from './components/offer/offer.component';
import { ClientOfferManager } from './services/client-offer-manager';
import { InventoryAuthScreenComponent } from './components/inventory/auth-screen/inventory-auth-sreen.component';
import { OfferProgress } from './components/offer-progress/offer-progress.component';
import { WebsocketService } from './services/websocket.service';
import { InventoryUtilsService } from './components/inventory/services/inventory-utils.service';
import { TradeUrlManagerService } from './components/trade-url-form/trade-url-manager.service';
import { OfferConverterService } from './services/offer-converter.service';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { TradeUrlFormComponent } from './components/trade-url-form/trade-url-form.component';
import { InventorySorterService } from './components/inventory/services/inventory-sorter.service';

InventoryFiltersRegister.registerFilters(INVENTORY_FILTERS);

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        CommonModule,
        MarketModule
    ],
    declarations: [
        AppComponent,
        InventoryComponent,
        LoadIndicatorComponent,
        InventoryAuthScreenComponent,
        InventoryFilterComponent,
        OfferComponent,
        OfferProgress,
        TradeUrlFormComponent,
        ItemsListComponent
    ],
    providers: [
        UserInventoryProvider,
        AppInventoryProvider,
        InventoryFilterService,
        InventorySearchService,
        InventorySorterService,
        ClientOfferManager,
        WebsocketService,
        InventoryUtilsService,
        TradeUrlManagerService,
        OfferConverterService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }