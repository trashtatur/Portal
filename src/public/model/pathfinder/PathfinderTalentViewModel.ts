export interface PathfinderTalentViewModel {
    id: string;
    name: string;
    type: string;
    description: string;
    benefits: string;
    conditions?: string;
    note?: string;
}

export const createPathfinderTalentViewModel = (id: string, name: string, type: string, description: string, benefits: string, conditions?: string, note?: string): PathfinderTalentViewModel => ({id: id, name: name, type: type, description: description, benefits: benefits, conditions: conditions, note: note});
