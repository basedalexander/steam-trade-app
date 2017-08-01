import { NgModule }      from '@angular/core';

import { DomHelperService } from './dom-helper.service';
import { MathService } from './math.service';

@NgModule({
    providers: [
        DomHelperService,
        MathService
    ]
})
export class CommonModule { }