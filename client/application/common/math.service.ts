import { Injectable } from '@angular/core';

@Injectable()
export class MathService {
    mulFloatNums(a: number, b: number): number {
        let num = 100000000000000000;
        return ((a * num) * (b * num)) / (num * num);
    }
}