import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {PathfinderSkill} from "../../../db/schemas/pathfinder/PathfinderSkill";
import {PathfinderSkillModel} from "../../../model/pathfinder/PathfinderSkillModel";

export class PathfinderSkillEntityToModelMapper implements EntityToModelMapperInterface{
    map(entity: PathfinderSkill): PathfinderSkillModel {
        const skillLevel = entity['PathfinderCreatureSkill'].skillLevel;
        return new PathfinderSkillModel(entity.uuid, entity.name, skillLevel);
    }
}