import {RangeTypeEnum} from "../enumeration/RangeTypeEnum";
import {DiceRollSpecification} from "../DiceRollSpecification";
import {PathfinderDamageType} from "./PathfinderDamageType";
import {ApplyEffects} from "@/public/model/status/decorator/DecoratorFunctions";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class PathfinderActionViewModel {
    @JsonProperty({name: 'id'})
    private _id: string;
    @JsonProperty({name: 'name'})
    private _name: string;
    @JsonProperty({name: 'rangeType'})
    private _rangeType: RangeTypeEnum;
    @JsonProperty({name: 'attackBonus'})
    private _attackBonus: number;
    @JsonProperty({name: 'range'})
    private _range: number;
    @JsonProperty({name: 'damage'})
    private _damage: DiceRollSpecification;
    @JsonProperty({name: 'critMod'})
    private _critMod: number;
    @JsonProperty({name: 'damageTypes'})
    private _damageTypes: PathfinderDamageType;
    @JsonProperty({name: 'additionalInfo'})
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
        additionalInfo?: string,
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

    get damageTypes(): PathfinderDamageType {
        return this._damageTypes;
    }

    set damageTypes(value: PathfinderDamageType) {
        this._damageTypes = value;
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
        return this._additionalInfo;
    }

    set additionalinfo(value: string) {
        this._additionalInfo = value;
    }
}