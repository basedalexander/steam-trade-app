export interface IRateRule {
    name: string;
    '0': number;
    '1': number;
    check: (item: any) => boolean;
}
