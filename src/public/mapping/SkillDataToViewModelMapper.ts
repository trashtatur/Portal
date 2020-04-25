import {skillData} from "../frontendTypes";
import {SkillViewModel} from "../model/SkillViewModel";

export class SkillDataToViewModelMapper {

    mapSingle = (data: skillData): SkillViewModel => {
        return new SkillViewModel(data._id, data._name, data._level)
    }

    mapMultiple = (data: skillData[]): SkillViewModel[] => {
        if (!data) {
            return null;
        }
        const viewModels: SkillViewModel[] = [];
        data.forEach(skill => {
            viewModels.push(this.mapSingle(skill));
        })
        return viewModels;
    }
}