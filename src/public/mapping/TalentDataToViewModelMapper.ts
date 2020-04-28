import {TalentViewModel} from "../model/pathfinder/TalentViewModel";
import {talentData} from "../frontendTypes";

export class TalentDataToViewModelMapper {

    mapSingle = (data: talentData): TalentViewModel => {
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

    mapMultiple = (data: talentData[]): TalentViewModel[] => {
        if (!data) {
            return null;
        }
        const viewModels: TalentViewModel[] = [];
        data.forEach(talent => {
            viewModels.push(this.mapSingle(talent));
        })
        return viewModels;
    }
}