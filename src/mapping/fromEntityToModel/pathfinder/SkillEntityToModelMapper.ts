import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {PathfinderSkill} from "../../../db/schemas/pathfinder/PathfinderSkill";
import {PathfinderSkillModel} from "../../../model/pathfinder/PathfinderSkillModel";

export class SkillEntityToModelMapper implements EntityToModelMapperInterface{
    map(entity: PathfinderSkill): PathfinderSkillModel {
        const skillLevel = entity['CreatureSkill'].skillLevel;
        return new PathfinderSkillModel(entity.uuid, entity.name, skillLevel);
    }
}