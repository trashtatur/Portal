import {ConverterInterface} from "../ConverterInterface";
import {PathfinderSkill} from "../../db/schemas/pathfinder/PathfinderSkill";
import {PathfinderSkillModel} from "../../model/pathfinder/PathfinderSkillModel";

export class PathfinderSkillConverter implements ConverterInterface<PathfinderSkill, PathfinderSkillModel>{
    convertEntity(entity: PathfinderSkill): PathfinderSkillModel {
        const skillLevel = entity['PathfinderCreatureSkill']?.skillLevel;
        return new PathfinderSkillModel(entity.uuid, entity.name, skillLevel);
    }

    convertMultipleEntities(entities?: PathfinderSkill[]): PathfinderSkillModel[] | null {
        if (!entities) {
            return [];
        }
        return entities.map(entity => {
            return this.convertEntity(entity);
        });
    }
}