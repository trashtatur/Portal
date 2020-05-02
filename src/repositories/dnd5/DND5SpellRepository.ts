import {Service} from "@tsed/di";
import {DND5SpellModel} from "../../model/dnd5/DND5SpellModel";
import {DND5SkillModel} from "../../model/dnd5/DND5SkillModel";

@Service()
export class DND5SpellRepository {

    create = async(dnd5SkillModel: DND5SkillModel): Promise<DND5SpellModel> => {

    }

    bulkCreate = async(dnd5SkillModels: DND5SkillModel[]): Promise<DND5SpellModel[]> => {

    }

    delete = async(id: string): Promise<boolean> => {

    }

    update = async(dnd5SkillModel: DND5SkillModel): Promise<DND5SpellModel> => {

    }

    findOneBy = async(key, value): Promise<DND5SpellModel> => {

    }

    findAll = async(): Promise<DND5SpellModel[]> => {

    }
}