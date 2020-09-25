import {RangeTypeEnum} from "../enumeration/RangeTypeEnum";
import {DiceRollSpecification} from "../DiceRollSpecification";
import {PathfinderDamageType} from "./PathfinderDamageType";
import {ApplyEffects} from "@/public/model/effects/decorator/DecoratorFunctions";

export class ActionViewModel {
    private _name: string;
    private _rangeType: RangeTypeEnum;
    private _attackBonus: number;
    private _id: string;
    private _additionalinfo: string;
    private _range: number;
    private _damage: DiceRollSpecification;
    private _critMod: number;
    private _damageType: PathfinderDamageType;
    private _additionalInfo?: string;

    constructor(
        id: string,
        name: string,
        rangeType: RangeTypeEnum,
        attackBonus: number,
        range: number,
        damage: DiceRollSpecification,
        critMod: number,
        damageType: PathfinderDamageType,
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

    @ApplyEffects
    get range(): number {
        return this._range;
    }

    set range(value: number) {
        this._range = value;
    }

    @ApplyEffects
    get damage(): DiceRollSpecification {
        return this._damage;
    }

    set damage(value: DiceRollSpecification) {
        this._damage = value;
    }

    @ApplyEffects
    get critMod(): number {
        return this._critMod;
    }

    set critMod(value: number) {
        this._critMod = value;
    }

    get damageType(): PathfinderDamageType {
        return this._damageType;
    }

    set damageType(value: PathfinderDamageType) {
        this._damageType = value;
    }

    get additionalInfo(): string {
        return this._additionalInfo;
    }

    set additionalInfo(value: string) {
        this._additionalInfo = value;
    }

    getFormattedAttackBonus(): string {
        if (this.attackBonus == null) {
            return '';
        }
        return String(this._attackBonus);
    }

    getFormattedCritMod(): string {
        if (this.critMod == null) {
            return ''
        }
        return String(this._critMod)
    }

    getFormattedRange(): string {
        if (this.range == null) {
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