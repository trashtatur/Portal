import {AbstractCreaturePropertyModel} from "../AbstractCreaturePropertyModel";
import {TypeEnum} from "../enumeration/TypeEnum";
import {AlignmentEnum} from "../enumeration/AlignmentEnum";
import {PathfinderCreatureSizeEnum} from "../enumeration/pathfinder/PathfinderCreatureSizeEnum";
import {CreatureStatsModel} from "../CreatureStatsModel";
import {PathfinderSavingThrowsModel} from "./PathfinderSavingThrowsModel";
import {PathfinderActionModel} from "./PathfinderActionModel";
import {PathfinderLanguageModel} from "./PathfinderLanguageModel";
import {PathfinderSkillModel} from "./PathfinderSkillModel";
import {PathfinderTalentModel} from "./PathfinderTalentModel";
import {NamedCreatureProperty} from "../NamedCreatureProperty";
import {getEnumKeyForValue} from "../../services/EnumKeyFromStringService";

export interface PathfinderCreaturePropertiesModel extends AbstractCreaturePropertyModel {
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
    stats: CreatureStatsModel;
    saveThrows: PathfinderSavingThrowsModel;
    xp?: number;
    image?: string;
    actions?: PathfinderActionModel[];
    languages?: PathfinderLanguageModel[];
    skills?: PathfinderSkillModel[];
    talents?: PathfinderTalentModel[];
    attackProperties?: NamedCreatureProperty[];
}

export const createPathfinderCreaturePropertiesModel = (id: string, type: TypeEnum, armorclass: number, hitpoints: number, alignment: AlignmentEnum, creatureClass: string, challenge: number, movement: number, ini: number, baseAtk: number, size: PathfinderCreatureSizeEnum, stats: CreatureStatsModel, saveThrows: PathfinderSavingThrowsModel, xp?: number, image?: string, actions?: PathfinderActionModel[], languages?: PathfinderLanguageModel[], skills?: PathfinderSkillModel[], talents?: PathfinderTalentModel[], attackProperties?: NamedCreatureProperty[]): PathfinderCreaturePropertiesModel => ({id: id, type: type, armorclass: armorclass, hitpoints: hitpoints, alignment: alignment, creatureClass: creatureClass, challenge: challenge, movement: movement, ini: ini, baseAtk: baseAtk, size: size, stats: stats, saveThrows: saveThrows, xp: xp, image: image, actions: actions, languages: languages, skills: skills, talents: talents, attackProperties: attackProperties});
