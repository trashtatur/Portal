import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {DND5LanguageModel} from "../../../model/dnd5/DND5LanguageModel";
import {DND5Language} from "../../../db/schemas/DND5/DND5Language";

export class DND5LanguageEntityToModelMapper implements EntityToModelMapperInterface<DND5Language, DND5LanguageModel>{
    map = (entity: DND5Language): DND5LanguageModel => {
        return new DND5LanguageModel(entity.uuid, entity.name);
    }

    mapMultiple = (entities?: DND5Language[]): DND5LanguageModel[] | null => {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.map(entity);
        })
    }
}