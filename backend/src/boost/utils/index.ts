export const tryJsonParse = (item: any) => {
    let parsed = item;
    try {
        parsed = JSON.parse(item);
    } catch (ex) {
        parsed = item;
    }
    return parsed;
};