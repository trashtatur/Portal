import {RangeTypeEnum} from "../enumeration/RangeTypeEnum";
import {DiceRollSpecification} from "../DiceRollSpecification";
import {DND5DamageType} from "./DND5DamageType";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class DND5ActionModel {
    @JsonProperty({name: 'id'})
    private readonly _id: string;
    @JsonProperty({name: 'name'})
    private readonly _name: string;
    @JsonProperty({name: 'rangeType'})
    private readonly _rangeType: RangeTypeEnum;
    @JsonProperty({name: 'attackBonus'})
    private readonly _attackBonus: number;
    @JsonProperty({name: 'range'})
    private readonly _range: string;
    @JsonProperty({name: 'magical'})
    private readonly _magical: boolean;
    @JsonProperty({name: 'damage'})
    private readonly _damage: DiceRollSpecification;
    @JsonProperty({name: 'damageType'})
    private readonly _damageType: DND5DamageType;
    @JsonProperty({name: 'additionalInfo'})
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