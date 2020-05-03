import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {DND5Talent} from "../../../db/schemas/DND5/DND5Talent";
import {DND5TalentModel} from "../../../model/dnd5/DND5TalentModel";

export class DND5TalentEntityToModelMapper implements EntityToModelMapperInterface<DND5Talent, DND5TalentModel> {
    map = (entity: DND5Talent): DND5TalentModel => {
        return new DND5TalentModel(
            entity.uuid,
            entity.name,
            entity.condition,
            entity.benefit
        );
    }

    mapMultiple = (entities?: DND5Talent[]): DND5TalentModel[] | null => {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.map(entity);
        })
    }

}