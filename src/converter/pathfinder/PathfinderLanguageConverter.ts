import {ConverterInterface} from "../ConverterInterface";
import {PathfinderLanguage} from "../../db/schemas/pathfinder/PathfinderLanguage";
import {PathfinderLanguageModel} from "../../model/pathfinder/PathfinderLanguageModel";

export class PathfinderLanguageConverter implements ConverterInterface<PathfinderLanguage, PathfinderLanguageModel>{
    convertEntity = (entity: PathfinderLanguage): PathfinderLanguageModel => {
        return new PathfinderLanguageModel(entity.uuid, entity.name)
    }

    convertMultipleEntities = (entities?: PathfinderLanguage[]): PathfinderLanguageModel[] | null => {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.convertEntity(entity);
        });
    }
}