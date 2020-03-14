import {RangeType} from "../dataModel/RangeType";
import {DamageViewModel} from "../dataModel/DamageViewModel";
import {DamageType} from "../dataModel/DamageType";

export class ActionViewModel {
    private _name: string;
    private _rangeType: RangeType;
    private _attackBonus: number;
    private _range: number;
    private _damage: DamageViewModel;
    private _critMod: number;
    private _damageType: DamageType;
    private _additionalInfo?: string;

    constructor(
    ) {
        this._name = '';
        this._rangeType = RangeType.NONE;
        this._attackBonus = null;
        this._range = null;
        this._damage = new DamageViewModel();
        this._critMod = null;
        this._damageType = new DamageType([], false);
        this._additionalInfo = '';
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get rangeType(): RangeType {
        return this._rangeType;
    }

    set rangeType(value: RangeType) {
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
}