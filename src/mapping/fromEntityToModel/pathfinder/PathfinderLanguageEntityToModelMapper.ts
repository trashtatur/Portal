import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {PathfinderLanguage} from "../../../db/schemas/pathfinder/PathfinderLanguage";
import {PathfinderLanguageModel} from "../../../model/pathfinder/PathfinderLanguageModel";

export class LanguageEntityToModelMapper implements EntityToModelMapperInterface{
    map(entity: PathfinderLanguage): PathfinderLanguageModel {
        return new PathfinderLanguageModel(entity.uuid, entity.name)
    }
}