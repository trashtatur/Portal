import {ModelInterface} from "../ModelInterface";
import {DiceRollSpecification} from "../DiceRollSpecification";
import {RangeTypeEnum} from "../enumeration/RangeTypeEnum";
import {PathfinderDamageType} from "./PathfinderDamageType";

export interface PathfinderActionModel {
    id: string;
    name: string;
    rangeType: RangeTypeEnum;
    attackBonus: number;
    range: number;
    damage: DiceRollSpecification;
    critMod: number;
    damageTypes: PathfinderDamageType;
    additionalInfo: string;
}

export const createPathfinderActionModel = (id: string, name: string, rangeType: RangeTypeEnum, attackBonus: number, range: number, damage: DiceRollSpecification, critMod: number, damageType: PathfinderDamageType, additionalInfo?: string): PathfinderActionModel => ({id: id, name: name, rangeType: rangeType, attackBonus: attackBonus, range: range, damage: damage, critMod: critMod, additionalInfo: additionalInfo});
