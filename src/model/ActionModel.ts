import {ModelInterface} from "./ModelInterface";
import {Damage} from "./dataModel/Damage";
import {RangeTypeEnum} from "./enumeration/RangeTypeEnum";
import {DamageType} from "./dataModel/DamageType";

export class ActionModel implements ModelInterface {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _rangeType: RangeTypeEnum;
    private readonly _attackBonus: number;
    private readonly _range: number;
    private readonly _damage: Damage;
    private readonly _critMod: number;
    private readonly _damageTypes: DamageType;
    private readonly _additionalInfo: string;

    constructor(
        id: string,
        name: string,
        rangeType: RangeTypeEnum,
        attackBonus: number,
        range: number,
        damage: Damage,
        critMod: number,
        damageType: DamageType,
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

    get damage(): Damage {
        return this._damage;
    }

    get critMod(): number {
        return this._critMod;
    }

    get damageTypes(): DamageType {
        return this._damageTypes;
    }

    get additionalInfo(): string {
        return this._additionalInfo;
    }
}
