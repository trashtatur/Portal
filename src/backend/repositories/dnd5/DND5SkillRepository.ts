import {Service} from "@tsed/di";
import type {DND5SkillModel} from "../../model/dnd5/DND5SkillModel";
import {createDND5SkillModel} from "../../model/dnd5/DND5SkillModel";

@Service()
export class DND5SkillRepository {

    create = async(dnd5SkillModel: DND5SkillModel): Promise<DND5SkillModel> => {
        return null;
    }

    bulkCreate = async(dnd5SkillModel: DND5SkillModel[]): Promise<DND5SkillModel[]> => {
        return null;
    }

    delete = async(id: string): Promise<boolean> => {
        return null;
    }

    update = async(dnd5SkillModel: DND5SkillModel): Promise<DND5SkillModel> => {
        return null;
    }

    findOneBy = async(key, value): Promise<DND5SkillModel> => {
        return null;
    }

    findAll = async(): Promise<DND5SkillModel[]> => {
        return null;
    }
}
