import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {PathfinderTalent} from "../../../db/schemas/pathfinder/PathfinderTalent";
import {PathfinderTalentModel} from "../../../model/pathfinder/PathfinderTalentModel";

export class TalentEntityToModelMapper implements EntityToModelMapperInterface{
    map(entity: PathfinderTalent): PathfinderTalentModel {
        return new PathfinderTalentModel(
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