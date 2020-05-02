import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {DND5Skill} from "../../../db/schemas/DND5/DND5Skill";
import {DND5SkillModel} from "../../../model/dnd5/DND5SkillModel";

export class DND5SkillEntityToModelMapper implements EntityToModelMapperInterface {
    map(entity: DND5Skill): DND5SkillModel {
        return undefined;
    }
}