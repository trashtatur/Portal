import {RangeTypeEnum} from "./enumeration/RangeTypeEnum";
import {DamageViewModel} from "./dataModel/DamageViewModel";
import {DamageType} from "./dataModel/DamageType";

export class ActionViewModel {
    private _name: string;
    private _rangeType: RangeTypeEnum;
    private _attackBonus: number;
    private _id: string;
    private _additionalinfo: string;
    private _range: number;
    private _damage: DamageViewModel;
    private _critMod: number;
    private _damageType: DamageType;
    private _additionalInfo?: string;

    constructor(
        id: string,
        name: string,
        rangeType: RangeTypeEnum,
        attackBonus: number,
        range: number,
        damage: DamageViewModel,
        critMod: number,
        damageType: DamageType,
        additionalInfo: string,
    ) {
        this._id = id;
        this._name = name;
        this._rangeType = rangeType;
        this._attackBonus = attackBonus;
        this._range = range;
        this._damage = damage;
        this._critMod = critMod;
        this._damageType = damageType;
        this._additionalinfo = additionalInfo;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get rangeType(): RangeTypeEnum {
        return this._rangeType;
    }

    set rangeType(value: RangeTypeEnum) {
        this._rangeType = value;
    }

    get attackBonus(): number {
        return this._attackBonus;
    }

    set attackBonus(value: number) {
        this._attackBonus = value;
    }

    get range(): number {
        return this._range;
    }

    set range(value: number) {
        this._range = value;
    }

    get damage(): DamageViewModel {
        return this._damage;
    }

    set damage(value: DamageViewModel) {
        this._damage = value;
    }

    get critMod(): number {
        return this._critMod;
    }

    set critMod(value: number) {
        this._critMod = value;
    }

    get damageType(): DamageType {
        return this._damageType;
    }

    set damageType(value: DamageType) {
        this._damageType = value;
    }

    get additionalInfo(): string {
        return this._additionalInfo;
    }

    set additionalInfo(value: string) {
        this._additionalInfo = value;
    }

    getFormattedAttackBonus(): string {
        if (this._attackBonus == null) {
            return '';
        }
        return String(this._attackBonus);
    }

    getFormattedCritMod(): string {
        if (this._critMod == null) {
            return ''
        }
        return String(this._critMod)
    }

    getFormattedRange(): string {
        if (this._range == null) {
            return ''
        }
        return String(this._range)
    }

    get additionalinfo(): string {
        return this._additionalinfo;
    }

    set additionalinfo(value: string) {
        this._additionalinfo = value;
    }
}