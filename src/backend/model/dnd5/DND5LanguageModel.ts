export interface DND5LanguageModel {
    id: string;
    name: string;
}

export const createDND5LanguageModel = (id: string, name: string): DND5LanguageModel => ({id: id, name: name});
