import {RangeTypeEnum} from "../enumeration/RangeTypeEnum";
import {DiceRollSpecification} from "../DiceRollSpecification";
import {PathfinderDamageType} from "./PathfinderDamageType";

export interface PathfinderActionViewModel {
    id: string;
    name: string;
    rangeType: RangeTypeEnum;
    attackBonus: number;
    range: number;
    damage: DiceRollSpecification;
    critMod: number;
    damageTypes: PathfinderDamageType;
    additionalInfo?: string;
}

export const createPathfinderActionViewModel = (id: string, name: string, rangeType: RangeTypeEnum, attackBonus: number, range: number, damage: DiceRollSpecification, critMod: number, damageType: PathfinderDamageType, additionalInfo?: string): PathfinderActionViewModel => ({id: id, name: name, rangeType: rangeType, attackBonus: attackBonus, range: range, damage: damage, critMod: critMod, additionalInfo: additionalInfo});
