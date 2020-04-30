import {ModelInterface} from "../ModelInterface";
import {DiceRollSpecification} from "../dataModel/DiceRollSpecification";
import {RangeTypeEnum} from "../enumeration/RangeTypeEnum";
import {PathfinderDamageType} from "../dataModel/pathfinder/PathfinderDamageType";

export class PathfinderActionModel implements ModelInterface {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _rangeType: RangeTypeEnum;
    private readonly _attackBonus: number;
    private readonly _range: number;
    private readonly _damage: DiceRollSpecification;
    private readonly _critMod: number;
    private readonly _damageTypes: PathfinderDamageType;
    private readonly _additionalInfo: string;

    constructor(
        id: string,
        name: string,
        rangeType: RangeTypeEnum,
        attackBonus: number,
        range: number,
        damage: DiceRollSpecification,
        critMod: number,
        damageType: PathfinderDamageType,
        additionalInfo?: string
    ) {
        this._id = id;
        this._name = name;
        this._rangeType = rangeType;
        this._attackBonus = attackBonus;
        this._range = range;
        this._damage = damage;
        this._critMod = critMod;
        this._damageTypes = damageType;
        this._additionalInfo = additionalInfo;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get rangeType(): RangeTypeEnum {
        return this._rangeType;
    }

    get attackBonus(): number {
        return this._attackBonus;
    }

    get range(): number {
        return this._range;
    }

    get damage(): DiceRollSpecification {
        return this._damage;
    }

    get critMod(): number {
        return this._critMod;
    }

    get damageTypes(): PathfinderDamageType {
        return this._damageTypes;
    }

    get additionalInfo(): string {
        return this._additionalInfo;
    }
}
