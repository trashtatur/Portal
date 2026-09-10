import {ModelInterface} from "./ModelInterface";
import {SceneModel} from "./SceneModel";
import {PersonModel} from "./PersonModel";

export interface AdventureModel {
    id: string;
    name: string;
    core: string;
    scenes?: SceneModel[];
    persons?: PersonModel[];
}

export const createAdventureModel = (id: string, name: string, core: string, scenes?: SceneModel[], persons?: PersonModel[]): AdventureModel => ({id: id, name: name, core: core, scenes: scenes, persons: persons});
