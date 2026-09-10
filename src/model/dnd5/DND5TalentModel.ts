export interface DND5TalentModel {
    id: string;
    name: string;
    condition: string;
    benefit: string;
}

export const createDND5TalentModel = (id: string, name: string, condition: string, benefit: string): DND5TalentModel => ({id: id, name: name, condition: condition, benefit: benefit});
