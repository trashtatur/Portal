import {TypeEnum} from "@/public/model/enumeration/TypesEnum";
import {DND5CreatureSizeEnum} from "@/public/model/enumeration/dnd5/DND5CreatureSizeEnum";
import {AlignmentEnum} from "@/public/model/enumeration/AlignmentEnum";
import {DND5CreatureStatsViewModel} from "@/public/model/dataModel/dnd5/DND5CreatureStatsViewModel";
import {SpeedViewModel} from "@/public/model/dataModel/SpeedViewModel";
import {DiceRollSpecification} from "@/public/model/dataModel/DiceRollSpecification";

export class FormSectionDisplayRuleService {

    shouldDisplaySizeAndAlignmentSection = (name: string, type: TypeEnum): boolean => {
        return name !== '' && type !== TypeEnum.NONE;
    }

    shouldDisplayStatBlockSection = (size: DND5CreatureSizeEnum, alignment: AlignmentEnum): boolean => {
        return size !== DND5CreatureSizeEnum.NONE && alignment !== AlignmentEnum.NONE;
    }

    shouldDisplayClassesAndLevelsSection = (hasClassLevels: boolean, type: TypeEnum, stats: DND5CreatureStatsViewModel): boolean => {
        const shouldHaveClassLevels = hasClassLevels || type === TypeEnum.PLAYER;

        return shouldHaveClassLevels
        && stats.charisma !== null
        && stats.constitution !== null
        && stats.dexterity !== null
        && stats.intelligence !== null
        && stats.strength !== null
        && stats.wisdom !== null
    }

    shouldDisplayHPSpeedAndACPlayerSection = (type: TypeEnum, stats: DND5CreatureStatsViewModel): boolean => {
        return type === TypeEnum.PLAYER
            && stats.charisma !== null
            && stats.constitution !== null
            && stats.dexterity !== null
            && stats.intelligence !== null
            && stats.strength !== null
            && stats.wisdom !== null
    }

    shouldDisplayHPSpeedAndACMonsterSection = (type: TypeEnum, stats: DND5CreatureStatsViewModel): boolean => {
        return type !== TypeEnum.PLAYER
            && stats.charisma !== null
            && stats.constitution !== null
            && stats.dexterity !== null
            && stats.intelligence !== null
            && stats.strength !== null
            && stats.wisdom !== null
    }

    shouldDisplayLanguagesFeatsSensesAndSkillsSection = (hitpoints: number, armorclass: number, speed: SpeedViewModel, dice: DiceRollSpecification): boolean => {
        return hitpoints !== null
        && armorclass !== null
        && speed.land !== null
        && dice.diceCount !== null
    }

    shouldDisplaySpellsSection = (hitpoints: number, armorclass: number, speed: SpeedViewModel, dice: DiceRollSpecification): boolean => {
        return this.shouldDisplayLanguagesFeatsSensesAndSkillsSection(hitpoints, armorclass, speed, dice);
    }

    shouldDisplaySpellsWithSlotsSection = (enforcedClassLevels: boolean, type: TypeEnum): boolean => {
        if (type === TypeEnum.PLAYER) {
            return true;
        }
        return  enforcedClassLevels;
    }

    shouldDisplayInnateSpellCastingOrSpellChoiceSwitch = (type: TypeEnum): boolean => {
        return type !== TypeEnum.PLAYER;

    }
}