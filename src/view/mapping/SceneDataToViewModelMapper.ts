import {sceneData} from "../components/componentTypes";
import {SceneViewModel} from "../model/scene/SceneViewModel";

export class SceneDataToViewModelMapper {

    mapSingle = (sceneData: sceneData): SceneViewModel => {
        return new SceneViewModel(
            sceneData._id,
            sceneData._adventureId,
            sceneData._number,
            sceneData._name,
            sceneData._hook,
            sceneData._token,
            sceneData._act,
            sceneData._resolve,
            this.mapMultiple(sceneData._parentScenes),
            sceneData._additionalDescription,
            sceneData._images,
            sceneData._treasure
        )
    };

    mapMultiple = (sceneData: sceneData[]): SceneViewModel[] => {
        const viewModels = [];
        if (!sceneData) {
            return viewModels
        }
        sceneData.forEach(scene => {
            viewModels.push(this.mapSingle(scene))
        })
        return viewModels
    }
}