import {Service} from "@tsed/di";
import {DND5SpellModel} from "../../model/dnd5/DND5SpellModel";

@Service()
export class DND5SpellRepository {

    create = async(dnd5SkillModel: DND5SpellModel): Promise<DND5SpellModel> => {
        return null;
    }

    bulkCreate = async(dnd5SkillModels: DND5SpellModel[]): Promise<DND5SpellModel[]> => {
        return null;
    }

    delete = async(id: string): Promise<boolean> => {
        return null;
    }

    update = async(dnd5SkillModel: DND5SpellModel): Promise<DND5SpellModel> => {
        return null;
    }

    findOneBy = async(key, value): Promise<DND5SpellModel> => {
        return null;
    }

    findAll = async(): Promise<DND5SpellModel[]> => {
        return null;
    }
}