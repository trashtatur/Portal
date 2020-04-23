import {EntityToModelMapperInterface} from "../EntityToModelMapperInterface";
import {Language} from "../../db/schemas/Language";
import {LanguageModel} from "../../model/LanguageModel";

export class LanguageEntityToModelMapper implements EntityToModelMapperInterface{
    map(entity: Language): LanguageModel {
        return new LanguageModel(entity.name)
    }
}