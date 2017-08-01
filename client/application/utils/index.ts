export function copyDeep(object: any): any {
    return JSON.parse(JSON.stringify(object));
}