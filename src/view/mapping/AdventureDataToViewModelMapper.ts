import {AdventureViewModel} from "../model/adventure/AdventureViewModel";
import {adventureData} from "../components/componentTypes";

export class AdventureDataToViewModelMapper {

    mapSingle(data: adventureData): AdventureViewModel {
        return null;
    }

    mapMultiple(dataArray: Array<adventureData>): AdventureViewModel[] {
        const adventures = [];
        dataArray.forEach(adventure => {
            adventures.push(
                new AdventureViewModel(
                    adventure._id,
                    adventure._name,
                    adventure._core
                )
            )
        });
        return adventures;
    }
}