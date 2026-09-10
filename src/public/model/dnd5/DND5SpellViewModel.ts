import {MagicSchoolEnum} from "@/public/model/enumeration/dnd5/MagicSchoolEnum";
import {SpellComponentEnum} from "@/public/model/enumeration/dnd5/SpellComponentEnum";

export interface DND5SpellViewModel {
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

export const createDND5SpellViewModel = (id: string, name: string, description: string, range: string, components: SpellComponentEnum[], canBeCastAsRitual: boolean, duration: string, needsConcentration: boolean, castingTime: string, school: MagicSchoolEnum, level: number, materials?: string, higherLevelsDescription?: string): DND5SpellViewModel => ({id: id, name: name, description: description, range: range, components: components, canBeCastAsRitual: canBeCastAsRitual, duration: duration, needsConcentration: needsConcentration, castingTime: castingTime, school: school, level: level, materials: materials, higherLevelsDescription: higherLevelsDescription});
