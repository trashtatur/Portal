import {EntityToModelMapperInterface} from "../EntityToModelMapperInterface";
import {Skill} from "../../db/schemas/Skill";
import {SkillModel} from "../../model/SkillModel";

export class SkillEntityToModelMapper implements EntityToModelMapperInterface{
    map(entity: Skill): SkillModel {
        const skillLevel = entity['CreatureSkill'].skillLevel;
        return new SkillModel(entity.uuid, entity.name, skillLevel);
    }
}