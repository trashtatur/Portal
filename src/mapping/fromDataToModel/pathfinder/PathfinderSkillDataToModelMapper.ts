import {DataToModelMapperInterface} from "../../DataToModelMapperInterface";
import {PathfinderSkillModel} from "../../../model/pathfinder/PathfinderSkillModel";
import {pathfinderSkillsData} from "../../../types/pathfinderBackendTypes";

export class PathfinderSkillDataToModelMapper implements DataToModelMapperInterface<PathfinderSkillModel>{
    map = (data: pathfinderSkillsData): PathfinderSkillModel => {
        return new PathfinderSkillModel(
            data._id,
            data._name,
            data._level
        )
    }

    mapMultiple = (data): PathfinderSkillModel[] => {
        if (!data) {
            return []
        }
        return data.map(skill => {
            return this.map(skill);
        })
    }
}