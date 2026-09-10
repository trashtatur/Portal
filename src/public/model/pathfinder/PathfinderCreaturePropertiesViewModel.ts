import {TypeEnum} from "../enumeration/TypesEnum";
import {AlignmentEnum} from "../enumeration/AlignmentEnum";
import {PathfinderCreatureSizeEnum} from "../enumeration/pathfinder/PathfinderCreatureSizeEnum";
import {PathfinderStatsViewModel} from "./PathfinderStatsViewModel";
import {PathfinderSavingThrowsViewModel} from "./PathfinderSavingThrowsViewModel";
import {PathfinderActionViewModel} from "./PathfinderActionViewModel";
import {PathfinderLanguageViewModel} from "./PathfinderLanguageViewModel";
import {PathfinderSkillViewModel} from "./PathfinderSkillViewModel";
import {PathfinderTalentViewModel} from "./PathfinderTalentViewModel";
import {NamedPropertyViewModel} from "../NamedPropertyViewModel";
import {AbstractPropertyViewModel} from "../AbstractPropertyViewModel";
import {getEnumKeyForValue} from "@/public/service/enumFromString.service";

export interface PathfinderCreaturePropertiesViewModel extends AbstractPropertyViewModel {
    id: string;
    type: TypeEnum;
    armorclass: number;
    hitpoints: number;
    alignment: AlignmentEnum;
    creatureClass: string;
    challenge: number;
    movement: number;
    ini: number;
    baseAtk: number;
    size: PathfinderCreatureSizeEnum;
    stats: PathfinderStatsViewModel;
    saveThrows: PathfinderSavingThrowsViewModel;
    xp?: number;
    image?: string;
    actions?: PathfinderActionViewModel[];
    languages?: PathfinderLanguageViewModel[];
    skills?: PathfinderSkillViewModel[];
    talents?: PathfinderTalentViewModel[];
    attackProperties?: NamedPropertyViewModel[];
}

export const createPathfinderCreaturePropertiesViewModel = (id: string, type: TypeEnum, armorclass: number, hitpoints: number, alignment: AlignmentEnum, creatureClass: string, challenge: number, movement: number, ini: number, baseAtk: number, size: PathfinderCreatureSizeEnum, stats: PathfinderStatsViewModel, saveThrows: PathfinderSavingThrowsViewModel, xp?: number, image?: string, actions?: PathfinderActionViewModel[], languages?: PathfinderLanguageViewModel[], skills?: PathfinderSkillViewModel[], talents?: PathfinderTalentViewModel[], attackProperties?: NamedPropertyViewModel[]): PathfinderCreaturePropertiesViewModel => ({id: id, type: type, armorclass: armorclass, hitpoints: hitpoints, alignment: alignment, creatureClass: creatureClass, challenge: challenge, movement: movement, ini: ini, baseAtk: baseAtk, size: size, stats: stats, saveThrows: saveThrows, xp: xp, image: image, actions: actions, languages: languages, skills: skills, talents: talents, attackProperties: attackProperties});
