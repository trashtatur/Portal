import {AdventureViewModel} from "../model/AdventureViewModel";
import {SceneDataToViewModelMapper} from "./SceneDataToViewModelMapper";
import {adventureData} from "../types/commonDataTypes";

export class AdventureDataToViewModelMapper {
    private readonly sceneDataToViewModelMapper: SceneDataToViewModelMapper;

    constructor() {
        this.sceneDataToViewModelMapper = new SceneDataToViewModelMapper();
    }

    mapSingle(data: adventureData): AdventureViewModel {
        return new AdventureViewModel(
            data._id,
            data._name,
            data._core,
            this.sceneDataToViewModelMapper.mapMultiple(data._scenes)
        )
    }

    mapMultiple(dataArray: Array<adventureData>): AdventureViewModel[] {
        const adventures = [];
        dataArray.forEach(adventure => {
            adventures.push(
                this.mapSingle(adventure)
            )
        });
        return adventures;
    }
}