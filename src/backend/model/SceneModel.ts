import {ModelInterface} from "./ModelInterface";
import {PersonModel} from "./PersonModel";

export interface SceneModel {
    id: string;
    adventureId: string;
    number: number;
    name: string;
    hook: string;
    token: string;
    act: number;
    resolve: string;
    parentScenes?: Array<SceneModel>;
    additionalDescription?: string;
    images?: Array<string>;
    treasure?: string;
    persons?: Array<PersonModel>;
}

export const createSceneModel = (id: string, adventureId: string, number: number, name: string, hook: string, token: string, act: number, resolve: string, parentScenes?: Array<SceneModel>, additionalDescription?: string, images?: Array<string>, treasure?: string, persons?: Array<PersonModel>): SceneModel => ({id: id, adventureId: adventureId, number: number, name: name, hook: hook, token: token, act: act, resolve: resolve, parentScenes: parentScenes, additionalDescription: additionalDescription, images: images, treasure: treasure, persons: persons});
