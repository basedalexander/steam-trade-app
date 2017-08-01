import { Component } from '@angular/core';

@Component({
    selector: 'load-indicator',
    template: `
        <div class="inventory-loader-indicator">
            <img src="static/img/inventory-spinner.gif" alt="spinner">
        </div>    
    `
})
export class LoadIndicatorComponent {
}

// TODO styles in trade-window.scss