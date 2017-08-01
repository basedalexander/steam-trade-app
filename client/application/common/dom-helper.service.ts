import { Injectable } from '@angular/core';

@Injectable()
export class DomHelperService {
    getElementWidth(elem: HTMLElement): number {
        return this.getElementStyleWidth(elem) - this.getScrollbarWidth();
    }

    private getScrollbarWidth(): number {
        if (this.scrollbarWidth) {
            return this.scrollbarWidth;
        }

        let outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.overflowY = "scroll";
        document.body.appendChild(outer);

        this.scrollbarWidth = outer.offsetWidth - outer.clientWidth;
        outer.remove();

        return this.scrollbarWidth;
    }

    private getElementStyleWidth(elem: HTMLElement): number {
        return parseFloat(getComputedStyle(elem).width);
    }

    private scrollbarWidth: number;
}