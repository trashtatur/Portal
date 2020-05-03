import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {PathfinderLanguage} from "../../../db/schemas/pathfinder/PathfinderLanguage";
import {PathfinderLanguageModel} from "../../../model/pathfinder/PathfinderLanguageModel";

export class PathfinderLanguageEntityToModelMapper implements EntityToModelMapperInterface<PathfinderLanguage, PathfinderLanguageModel>{
    map = (entity: PathfinderLanguage): PathfinderLanguageModel => {
        return new PathfinderLanguageModel(entity.uuid, entity.name)
    }

    mapMultiple = (entities?: PathfinderLanguage[]): PathfinderLanguageModel[] | null => {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.map(entity);
        });
    }
}