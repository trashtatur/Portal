import {SceneViewModel} from "./SceneViewModel";

export interface AdventureViewModel {
    scenes: SceneViewModel[] ;
}

export const createAdventureViewModel = (scenes: Array<SceneViewModel> = []): AdventureViewModel => ({scenes: scenes});
