import {ModelInterface} from "../ModelInterface";

export interface PathfinderSkillModel {
    id: string;
    name: string;
    level: number;
}

export const createPathfinderSkillModel = (id: string, name: string, level: number): PathfinderSkillModel => ({id: id, name: name, level: level});
