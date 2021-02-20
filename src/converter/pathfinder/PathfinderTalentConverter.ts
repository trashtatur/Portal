import {ConverterInterface} from "../ConverterInterface";
import {PathfinderTalent} from "../../db/schemas/pathfinder/PathfinderTalent";
import {PathfinderTalentModel} from "../../model/pathfinder/PathfinderTalentModel";

export class PathfinderTalentConverter implements ConverterInterface<PathfinderTalent, PathfinderTalentModel>{
    convertEntity(entity: PathfinderTalent): PathfinderTalentModel {
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

    convertMultipleEntities(entities?: PathfinderTalent[]): PathfinderTalentModel[] | null {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.convertEntity(entity);
        });
    }
}