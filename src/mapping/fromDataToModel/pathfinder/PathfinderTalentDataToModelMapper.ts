import {DataToModelMapperInterface} from "../../DataToModelMapperInterface";
import {PathfinderTalentModel} from "../../../model/pathfinder/PathfinderTalentModel";

export class PathfinderTalentDataToModelMapper implements DataToModelMapperInterface<PathfinderTalentModel>{
    map = (data): PathfinderTalentModel => {
        return new PathfinderTalentModel(
            data._id,
            data._name,
            data._type,
            data._description,
            data._benefits,
            data._conditions ?? null,
            data._note ?? null
        )
    }

    mapMultiple = (data): PathfinderTalentModel[] => {
        if (!data) {
            return []
        }
        return data.map(talent => {
            return this.map(talent);
        })
    }
}