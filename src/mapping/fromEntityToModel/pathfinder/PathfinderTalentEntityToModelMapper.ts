import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {PathfinderTalent} from "../../../db/schemas/pathfinder/PathfinderTalent";
import {PathfinderTalentModel} from "../../../model/pathfinder/PathfinderTalentModel";

export class PathfinderTalentEntityToModelMapper implements EntityToModelMapperInterface<PathfinderTalent, PathfinderTalentModel>{
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

    mapMultiple(entities?: PathfinderTalent[]): PathfinderTalentModel[] | null {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.map(entity);
        });
    }
}