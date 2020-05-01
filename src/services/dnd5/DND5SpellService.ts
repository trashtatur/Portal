import {Service} from "@tsed/di";
import {DND5SpellModel} from "../../model/dnd5/DND5SpellModel";

@Service()
export class DND5SpellService {

    create = async(spellData): Promise<DND5SpellModel> => {

    }

    bulkCreate = async(spellDataArray): Promise<DND5SpellModel[]> => {

    }

    delete = async(id: string): Promise<boolean> => {

    }

    update = async(spellData): Promise<DND5SpellModel> => {

    }

    findOneBy = async(key, value): Promise<DND5SpellModel> => {

    }

    findAll = async(): Promise<DND5SpellModel[]> => {

    }
}