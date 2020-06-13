import {TalentViewModel} from "../../model/pathfinder/TalentViewModel";
import {pathfinderTalentData} from "../../types/pathfinderDataTypes";

export class PathfinderTalentDataToViewModelMapper {

    mapSingle = (data: pathfinderTalentData): TalentViewModel => {
        return new TalentViewModel(
            data._id,
            data._name,
            data._type,
            data._description,
            data._benefits,
            data._conditions,
            data._note
        )
    }

    mapMultiple = (data: pathfinderTalentData[]): TalentViewModel[] => {
        if (!data) {
            return null;
        }
        return data.map(talent => {
            return this.mapSingle(talent)
        });
    }
}