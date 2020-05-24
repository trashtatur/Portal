import {TalentViewModel} from "../../model/pathfinder/TalentViewModel";
import {pathfinderTalentData} from "../../types/pathfinderDataTypes";

export class PathfinderTalentDataToViewModelMapper {

    mapSingle = (data: pathfinderTalentData): TalentViewModel => {
        return new TalentViewModel(
            data.uuid,
            data.name,
            data.type,
            data.description,
            data.benefits,
            data.conditions,
            data.note
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