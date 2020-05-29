import {DataToModelMapperInterface} from "../../DataToModelMapperInterface";
import {PathfinderLanguageModel} from "../../../model/pathfinder/PathfinderLanguageModel";

export class PathfinderLanguageDataToModelMapper implements DataToModelMapperInterface<PathfinderLanguageModel>{
    map = (data): PathfinderLanguageModel => {
        return new PathfinderLanguageModel(data._id, data._name)
    }

    mapMultiple = (data): PathfinderLanguageModel[] => {
        if (!data) {
            return [];
        }
        return data.map(language => {
            return this.map(language)
        })
    }
}