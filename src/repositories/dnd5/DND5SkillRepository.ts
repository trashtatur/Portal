import {Service} from "@tsed/di";
import {DND5SkillModel} from "../../model/dnd5/DND5SkillModel";

@Service()
export class DND5SkillRepository {

    create = async(dnd5SkillModel: DND5SkillModel): Promise<DND5SkillModel> => {

    }

    bulkCreate = async(dnd5SkillModel: DND5SkillModel[]): Promise<DND5SkillModel[]> => {

    }

    delete = async(id: string): Promise<boolean> => {

    }

    update = async(dnd5SkillModel: DND5SkillModel): Promise<DND5SkillModel> => {

    }

    findOneBy = async(key, value): Promise<DND5SkillModel> => {

    }

    findAll = async(): Promise<DND5SkillModel[]> => {

    }
}