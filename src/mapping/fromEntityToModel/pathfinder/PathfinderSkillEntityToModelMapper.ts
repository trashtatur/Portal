import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {PathfinderSkill} from "../../../db/schemas/pathfinder/PathfinderSkill";
import {PathfinderSkillModel} from "../../../model/pathfinder/PathfinderSkillModel";

export class PathfinderSkillEntityToModelMapper implements EntityToModelMapperInterface<PathfinderSkill, PathfinderSkillModel>{
    map(entity: PathfinderSkill): PathfinderSkillModel {
        const skillLevel = entity['PathfinderCreatureSkill']?.skillLevel;
        return new PathfinderSkillModel(entity.uuid, entity.name, skillLevel);
    }

    mapMultiple(entities?: PathfinderSkill[]): PathfinderSkillModel[] | null {
        if (!entities) {
            return [];
        }
        return entities.map(entity => {
            return this.map(entity);
        });
    }
}