import {PersonViewModel} from "@/public/model/PersonViewModel";

export interface SceneViewModel {
    id?: string;
    parentScenes: SceneViewModel[] ;
    images: string[] ;
    adventureId?: string;
    persons?: PersonViewModel[] ;
}

export const createSceneViewModel = (id?: string, adventureId?: string, number: number = null, act: number = null, parentScenes: SceneViewModel[] = [], images: string[] = [], persons: PersonViewModel[] = []): SceneViewModel => ({id: id, parentScenes: parentScenes, images: images, adventureId: adventureId, persons: persons});
