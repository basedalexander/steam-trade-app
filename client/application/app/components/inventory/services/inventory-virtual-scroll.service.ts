import { Injectable, EventEmitter } from '@angular/core';
import { DomHelperService } from '../../../../common/dom-helper.service';
import { MathService } from '../../../../common/math.service';

export type VirtualScrollCalculationResult = {
    preIndex: number;
    postIndex: number;
}

export class ItemsListVirtualScrollService {

    constructor(
        private domHelper: DomHelperService,
        private math: MathService
    ) {
    }

    change: EventEmitter<VirtualScrollCalculationResult> = new EventEmitter<VirtualScrollCalculationResult>();

    init(inventoryElement: HTMLElement): void {
        this.tradeItemsNativeElement = inventoryElement;
        this.calculateRowHeight();

        let self = this;

        function throttle(method: string, wait: number) {
            var time = Date.now();
            return function () {
                if ((time + wait - Date.now()) < 0) {
                    self[method]();
                    time = Date.now();
                }
            }
        }

        this.tradeItemsNativeElement.addEventListener('scroll', throttle('onScrolled', 200));
    }

    onScrolled(): void {
        let result: VirtualScrollCalculationResult = this.calculateVirtualScroll();
        this.change.emit(result);
    }

    private calculateVirtualScroll(): VirtualScrollCalculationResult {
        let preIndex: number = this.calculatePreIndex();
        let postIndex: number = this.calculatePostIndex(preIndex);

        return {
            preIndex: preIndex,
            postIndex: postIndex
        }
    }

    private calculatePreIndex(): number {
        let preRowsNum: number = Math.floor(this.tradeItemsNativeElement.scrollTop / this.rowHeight) - 1;
        if (preRowsNum < 0) {
            preRowsNum = 0;
        }
        return this.math.mulFloatNums(preRowsNum, 6);
    }

    private calculatePostIndex(preIndex: number): number {
        return preIndex + 100;
    }

    private rowHeight: number;
    private tradeItemsNativeElement: HTMLElement;

    private calculateRowHeight(): void {
        let percent = 0.16666666666666668;
        let width: number = this.domHelper.getElementWidth(this.tradeItemsNativeElement);
        this.rowHeight = this.math.mulFloatNums(width, percent);
    }
}