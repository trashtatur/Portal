import {RangeTypeEnum} from "../enumeration/RangeTypeEnum";
import {DiceRollSpecification} from "../DiceRollSpecification";
import {DND5DamageType} from "./DND5DamageType";

export interface DND5ActionModel {
    id: string;
    name: string;
    rangeType: RangeTypeEnum;
    attackBonus: number;
    range: string;
    magical: boolean;
    damage: DiceRollSpecification;
    damageType: DND5DamageType;
    additionalInfo: string;
}

export const createDND5ActionModel = (id: string, name: string, rangeType: RangeTypeEnum, attackBonus: number, range: string, magical: boolean, damage: DiceRollSpecification, damageType: DND5DamageType, additionalInfo: string): DND5ActionModel => ({id: id, name: name, rangeType: rangeType, attackBonus: attackBonus, range: range, magical: magical, damage: damage, damageType: damageType, additionalInfo: additionalInfo});
