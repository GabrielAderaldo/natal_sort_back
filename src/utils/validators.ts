export const validate = (value: any): boolean => {
    if(value === undefined || value === null) return false;
    if(value == '') return false;
    return true;
}