import {ModelInterface} from "./ModelInterface";
import {AdventureModel} from "./AdventureModel";
import {SceneModel} from "./SceneModel";

export interface PersonModel {
    id: string;
    name: string;
    type: string;
    needs: string;
    desires: string;
    weaknesses: string;
    enemies: string;
    image?: string;
    customFields?: Map<string, string>;
    additionalDescription?: string;
    adventures?: Array<AdventureModel>;
    scenes?: Array<SceneModel>;
}

export const createPersonModel = (id: string, name: string, type: string, needs: string, desires: string, weaknesses: string, enemies: string, image?: string, customFields?: Map<string, string>, additionalDescription?: string, adventures?: Array<AdventureModel>, scenes?: Array<SceneModel>): PersonModel => ({id: id, name: name, type: type, needs: needs, desires: desires, weaknesses: weaknesses, enemies: enemies, image: image, customFields: customFields, additionalDescription: additionalDescription, adventures: adventures, scenes: scenes});
