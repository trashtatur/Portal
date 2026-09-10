import {AdventureViewModel} from "@/public/model/AdventureViewModel";
import {SceneViewModel} from "@/public/model/SceneViewModel";

export interface PersonViewModel {
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
    adventures?: AdventureViewModel[];
    scenes?: SceneViewModel[];
}

export const createPersonViewModel = (id: string, name: string, type: string, needs: string, desires: string, weaknesses: string, enemies: string, image?: string, customFields?: Map<string, string>, additionalDescription?: string, adventures?: AdventureViewModel[], scenes?: SceneViewModel[]): PersonViewModel => ({id: id, name: name, type: type, needs: needs, desires: desires, weaknesses: weaknesses, enemies: enemies, image: image, customFields: customFields, additionalDescription: additionalDescription, adventures: adventures, scenes: scenes});
