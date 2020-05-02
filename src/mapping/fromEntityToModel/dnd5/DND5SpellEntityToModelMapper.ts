import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {DND5Spell} from "../../../db/schemas/DND5/DND5Spell";
import {DND5SpellModel} from "../../../model/dnd5/DND5SpellModel";
import {getEnumKeyForValue} from "../../../helper/HelperFunctions";
import {MagicSchoolEnum} from "../../../model/enumeration/dnd5/MagicSchoolEnum";
import {SpellComponentEnum} from "../../../model/dataModel/SpellComponentEnum";

export class DND5SpellEntityToModelMapper implements EntityToModelMapperInterface{
    map(entity: DND5Spell): DND5SpellModel {
        return new DND5SpellModel(
            entity.uuid,
            entity.name,
            entity.description,
            entity.range,
            this.mapComponents(entity.components),
            entity.ritual,
            entity.duration,
            entity.concentration,
            entity.castingTime,
            getEnumKeyForValue(entity.school, MagicSchoolEnum),
            entity.materials.split(','),
            entity.higherLevelsDescription
        );
    }

    private mapComponents = (spellComponentsString: string): SpellComponentEnum[] => {
        const spellComponentArray = spellComponentsString.split(',')
        return spellComponentArray.map(component => {
            return getEnumKeyForValue(component, SpellComponentEnum);
        });
    }
}