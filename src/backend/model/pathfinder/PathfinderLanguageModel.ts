import {ModelInterface} from "../ModelInterface";

export interface PathfinderLanguageModel {
    name: string;
}

export const createPathfinderLanguageModel = (id: string, name: string): PathfinderLanguageModel => ({name: name});
