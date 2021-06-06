import {TypeEnum} from "@/public/model/enumeration/TypesEnum";
import {DND5CreatureSizeEnum} from "@/public/model/enumeration/dnd5/DND5CreatureSizeEnum";
import {AlignmentEnum} from "@/public/model/enumeration/AlignmentEnum";
import {DND5CreatureStatsViewModel} from "@/public/model/dnd5/DND5CreatureStatsViewModel";
import {SpeedViewModel} from "@/public/model/SpeedViewModel";
import {DiceRollSpecification} from "@/public/model/DiceRollSpecification";

export const shouldDisplaySizeAndAlignmentSection = (name: string, type: TypeEnum): boolean => {
    return name !== '' && type !== TypeEnum.NONE;
}

export const shouldDisplayStatBlockSection = (size: DND5CreatureSizeEnum, alignment: AlignmentEnum): boolean => {
    return size !== DND5CreatureSizeEnum.NONE && alignment !== AlignmentEnum.NONE;
}

export const shouldDisplayClassesAndLevelsSection = (hasClassLevels: boolean, type: TypeEnum, stats: DND5CreatureStatsViewModel): boolean => {
    const shouldHaveClassLevels = hasClassLevels || type === TypeEnum.PLAYER;

    return shouldHaveClassLevels
        && stats.charisma !== null
        && stats.constitution !== null
        && stats.dexterity !== null
        && stats.intelligence !== null
        && stats.strength !== null
        && stats.wisdom !== null
}

export const shouldDisplayHPSpeedAndACPlayerSection = (type: TypeEnum, stats: DND5CreatureStatsViewModel): boolean => {
    return type === TypeEnum.PLAYER
        && stats.charisma !== null
        && stats.constitution !== null
        && stats.dexterity !== null
        && stats.intelligence !== null
        && stats.strength !== null
        && stats.wisdom !== null
}

export const shouldDisplayHPSpeedAndACMonsterSection = (type: TypeEnum, stats: DND5CreatureStatsViewModel): boolean => {
    return type !== TypeEnum.PLAYER
        && stats.charisma !== null
        && stats.constitution !== null
        && stats.dexterity !== null
        && stats.intelligence !== null
        && stats.strength !== null
        && stats.wisdom !== null
}

export const shouldDisplayLanguagesFeatsSensesAndSkillsSection = (hitpoints: number, armorclass: number, speed: SpeedViewModel, dice: DiceRollSpecification): boolean => {
    return hitpoints !== null
        && armorclass !== null
        && speed.land !== null
        && dice.diceCount !== null
}

export const shouldDisplaySpellsSection = (hitpoints: number, armorclass: number, speed: SpeedViewModel, dice: DiceRollSpecification): boolean => {
    return shouldDisplayLanguagesFeatsSensesAndSkillsSection(hitpoints, armorclass, speed, dice);
}

export const shouldDisplaySpellsWithSlotsSection = (enforcedClassLevels: boolean, type: TypeEnum): boolean => {
    if (type === TypeEnum.PLAYER) {
        return true;
    }
    return  enforcedClassLevels;
}

export const shouldDisplayInnateSpellCastingOrSpellChoiceSwitch = (type: TypeEnum): boolean => type !== TypeEnum.PLAYER;
