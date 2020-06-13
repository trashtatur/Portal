import {DND5SpellViewModel} from "@/public/model/dnd5/DND5SpellViewModel";
import {dnd5SpellData} from "@/public/types/dnd5DataTypes";
import {SpellComponentEnum} from "@/public/model/enumeration/dnd5/SpellComponentEnum";
import {getEnumKeyForValue} from "@/public/service/helperFunctions";
import {MagicSchoolEnum} from "@/public/model/enumeration/dnd5/MagicSchoolEnum";

export class DND5SpellDataToViewModelMapper {

    mapSingle = (data: dnd5SpellData): DND5SpellViewModel => {
        return new DND5SpellViewModel(
            data._id,
            data._name,
            data._description,
            data._range,
            this.mapSpellComponents(data._components),
            data._canBeCastAsRitual,
            data._duration,
            data._needsConcentration,
            data._castingTime,
            getEnumKeyForValue(data._school, MagicSchoolEnum),
            data._level,
            data._materials,
            data._higherLevelsDescription
        )
    }

    mapMultiple = (data: dnd5SpellData[]): DND5SpellViewModel[] => {
        if (!data) {
            return []
        }
        return data.map(dnd5Spell => {
            return this.mapSingle(dnd5Spell);
        })
    }

    private mapSpellComponents = (spellComponents: string[]): SpellComponentEnum[] => {
        return spellComponents.map(spellComponent => {
            return getEnumKeyForValue(spellComponent, SpellComponentEnum)
        })
    }
}