import * as fs from 'fs';
import * as path from 'path';

export interface IDatabaseQuery {
}

export type DatabaseQueryResult = { [key: string]: any }

export type DbEntry = {
    username: string,
    password: string
}

export class Db {
    constructor(dbPath: string) {
        this.dbPath = dbPath;
        this.init(dbPath);
    }

    public find(query: IDatabaseQuery): Promise<DatabaseQueryResult[]> {
        return new Promise<DatabaseQueryResult[]>((resolve, reject) => {
            this.ensureDatabase()
                .then(db => {
                    let queryField: string = this.getQueryField(query);
                    let searchResult: any[] = this.search(db, queryField, query[queryField]);
                    let result = searchResult[0];

                    result ? resolve(result) : reject();
                });
        });
    }

    public add(entry: DbEntry): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.ensureDatabase()
                .then(db => {
                    db.push(entry);
                    fs.writeFile(this.dbPath, JSON.stringify(db), (err) => {
                        if (err) {
                            return reject();
                        }
                        resolve();
                    });
                });
        });
    }

    private dbPath: string;

    private init(dbPath: string) {
        fs.stat(dbPath, (err, stats) => {
            if (err) {
                fs.writeFile(dbPath, JSON.stringify([]), (err) => {});
            }
        });
    }

    private search(db: any[], field: string, value: any): any[] {
        return db.filter((entry: any) => {
            return entry[field] === value;
        });
    }

    private ensureDatabase(): Promise<any[]>{
        return new Promise<any[]>((resolve, reject) => {
            fs.readFile(this.dbPath, 'utf8', (err: Error, data: string) => {
                let parsedDatabase = JSON.parse(data);
                resolve(parsedDatabase);
            });
        });
    }

    private getQueryField(query: IDatabaseQuery): string {
        return Object.keys(query)[0];
    }
}

let dbPath: string = path.join(__dirname, './users.json');

export var db = new Db(dbPath);
