import {DataToModelMapperInterface} from "../../DataToModelMapperInterface";
import {DND5SkillModel} from "../../../model/dnd5/DND5SkillModel";

export class DND5SkillDataToModelMapper implements DataToModelMapperInterface<DND5SkillModel>{
    map = (data): DND5SkillModel => {
        return null;
    }

    mapMultiple = (data): DND5SkillModel[] => {
        return [];
    }
}