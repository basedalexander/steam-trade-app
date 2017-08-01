export class Enviroment {
    constructor() {
        this.envMode = process.env[this.enviromentKey];
    }

    public get(): string {
        return this.envMode;
    }

    private enviromentKey: string = 'ENV_MODE';

    private envMode: string;
}

export let enviroment = new Enviroment();
