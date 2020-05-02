import {RangeTypeEnum} from "../enumeration/RangeTypeEnum";
import {DiceRollSpecification} from "../dataModel/DiceRollSpecification";
import {DND5DamageType} from "../dataModel/dnd5/DND5DamageType";

export class DND5ActionModel {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _rangeType: RangeTypeEnum;
    private readonly _attackBonus: number;
    private readonly _range: string;
    private readonly _magical: boolean;
    private readonly _damage: DiceRollSpecification;
    private readonly _damageType: DND5DamageType;
    private readonly _additionalInfo: string;

    constructor(
        id: string,
        name: string,
        rangeType: RangeTypeEnum,
        attackBonus: number,
        range: string,
        magical: boolean,
        damage: DiceRollSpecification,
        damageType: DND5DamageType,
        additionalInfo: string
    ) {
        this._id = id;
        this._name = name;
        this._rangeType = rangeType;
        this._attackBonus = attackBonus;
        this._range = range;
        this._magical = magical;
        this._damage = damage;
        this._damageType = damageType;
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

    get range(): string {
        return this._range;
    }

    get magical(): boolean {
        return this._magical;
    }

    get damage(): DiceRollSpecification {
        return this._damage;
    }

    get damageType(): DND5DamageType {
        return this._damageType;
    }

    get additionalInfo(): string {
        return this._additionalInfo;
    }
}