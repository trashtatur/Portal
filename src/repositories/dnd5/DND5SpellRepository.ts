import {Service} from "@tsed/di";
import {DND5SpellModel} from "../../model/dnd5/DND5SpellModel";
import {DND5Spell} from "../../db/schemas/DND5/DND5Spell";
import {DND5SpellConverter} from "../../converter/dnd5/DND5SpellConverter";

@Service()
export class DND5SpellRepository {
    private dnd5SpellConverter: DND5SpellConverter;

    constructor(
        dnd5SpellConverter: DND5SpellConverter
    ) {
        this.dnd5SpellConverter = dnd5SpellConverter;
    }

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
        const spells = await DND5Spell.findAll();
        return this.dnd5SpellConverter.convertMultipleEntities(spells);
    }
}