import { Injectable } from '@angular/core';

@Injectable()
export class InventorySearchService {

    search(searchString: string, collection: any[]): any[] {
        let result: any[];

        result = collection.filter(item => {
            let matchInName: boolean = ((new RegExp(searchString, 'i')).test(item.market_hash_name));

            return matchInName;
        });

        return result;
    }
}