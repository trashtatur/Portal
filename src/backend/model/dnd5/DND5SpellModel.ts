import {SpellComponentEnum} from "../SpellComponentEnum";
import {MagicSchoolEnum} from "../enumeration/dnd5/MagicSchoolEnum";

export interface DND5SpellModel {
    id: string;
    name: string;
    description: string;
    range: string;
    components: SpellComponentEnum[];
    canBeCastAsRitual: boolean;
    duration: string;
    needsConcentration: boolean;
    castingTime: string;
    school: MagicSchoolEnum;
    level: number;
    materials?: string;
    higherLevelsDescription?: string;
}

export const createDND5SpellModel = (id: string, name: string, description: string, range: string, components: SpellComponentEnum[], canBeCastAsRitual: boolean, duration: string, needsConcentration: boolean, castingTime: string, school: MagicSchoolEnum, level: number, materials?: string, higherLevelsDescription?: string): DND5SpellModel => ({id: id, name: name, description: description, range: range, components: components, canBeCastAsRitual: canBeCastAsRitual, duration: duration, needsConcentration: needsConcentration, castingTime: castingTime, school: school, level: level, materials: materials, higherLevelsDescription: higherLevelsDescription});
