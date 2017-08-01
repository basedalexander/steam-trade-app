import { Component } from '@angular/core';

@Component({
    selector: 'inventory-auth-screen',
    template: `
        <div class="inventory-auth-screen">
            <p class="steam-auth-required-text"> Please sign in
                <a class='sign-in-button' href="/auth/steam">
                    <img src="static/img/signInBig.png" alt="sign-in-with-steam" class="sign-with-steam-img">
                </a>
            </p>
        </div>
    `
})
export class InventoryAuthScreenComponent {
}