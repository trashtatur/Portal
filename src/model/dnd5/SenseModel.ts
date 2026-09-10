export interface SenseModel {
    name: string;
    value: string;
}

export const createSenseModel = (name: string, value: string): SenseModel => ({name: name, value: value});
