export function urlQueryBuilder(query:object, domain:string): string {
    return Object.entries(query)
            .reduce((finalString: string, [key , value], index: number, array) => `${finalString}${key}=${value}${index == array.length-1 ? '' : '&'}`
            ,`${domain}?`);
}