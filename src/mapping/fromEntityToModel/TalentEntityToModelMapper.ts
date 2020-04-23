import {EntityToModelMapperInterface} from "../EntityToModelMapperInterface";
import {Talent} from "../../db/schemas/Talent";
import {TalentModel} from "../../model/TalentModel";

export class TalentEntityToModelMapper implements EntityToModelMapperInterface{
    map(entity: Talent): TalentModel {
        return new TalentModel(
            entity.uuid,
            entity.name,
            entity.type,
            entity.description,
            entity.benefits,
            entity.conditions,
            entity.note
        )
    }
}