import {Service} from "@tsed/di";
import {DND5SkillModel} from "../../model/dnd5/DND5SkillModel";

@Service()
export class DND5SkillService {

    create = async(skillData): Promise<DND5SkillModel> => {

    }

    bulkCreate = async(skillDataArray): Promise<DND5SkillModel[]> => {

    }

    delete = async(id: string): Promise<boolean> => {

    }

    update = async(skillData): Promise<DND5SkillModel> => {

    }

    findOneBy = async(key, value): Promise<DND5SkillModel> => {

    }

    findAll = async(): Promise<DND5SkillModel[]> => {

    }
}