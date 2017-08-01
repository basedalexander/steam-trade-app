import { BlacklistChecker } from './checkers/checker';
import { BLCheckers } from './checkers/index';

export class BlacklistService {

    checkItem(item: any, alreadyParsedItems: any[]): boolean {

        let length: number = this.checkers.length;

        for (let i = 0; i < length; i++) {

            let checker: BlacklistChecker = this.checkers[i];

            if (checker(item, alreadyParsedItems)) {
                return true;
            }
        }

        return false;
    }

    registerCheckers(checkers: BlacklistChecker[]): void {
        this.checkers = checkers;
    }

    private checkers: BlacklistChecker[] = [];
}

export let blacklistService = new BlacklistService();

blacklistService.registerCheckers(BLCheckers);