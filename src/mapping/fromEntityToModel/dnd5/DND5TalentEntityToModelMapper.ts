import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {DND5Talent} from "../../../db/schemas/DND5/DND5Talent";
import {DND5TalentModel} from "../../../model/dnd5/DND5TalentModel";

export class DND5TalentEntityToModelMapper implements EntityToModelMapperInterface {
    map(entity: DND5Talent): DND5TalentModel {
        return new DND5TalentModel(
            entity.uuid,
            entity.name,
            entity.condition,
            entity.benefit
        );
    }
}