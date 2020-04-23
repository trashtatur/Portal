import {EntityToModelMapperInterface} from "../EntityToModelMapperInterface";
import {Skill} from "../../db/schemas/Skill";
import {SkillModel} from "../../model/SkillModel";

export class SkillEntityToModelMapper implements EntityToModelMapperInterface{
    map(entity: Skill): SkillModel {
        return null;
    }
}