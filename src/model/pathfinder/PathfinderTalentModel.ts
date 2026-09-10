import {ModelInterface} from "../ModelInterface";

export interface PathfinderTalentModel {
    id: string;
    name: string;
    type: string;
    description: string;
    benefits: string;
    conditions?: string;
    note?: string;
}

export const createPathfinderTalentModel = (id: string, name: string, type: string, description: string, benefits: string, conditions?: string, note?: string): PathfinderTalentModel => ({id: id, name: name, type: type, description: description, benefits: benefits, conditions: conditions, note: note});
