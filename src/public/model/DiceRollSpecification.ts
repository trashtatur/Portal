import {AbstractEffectViewModel} from "@/public/model/effects/AbstractEffectViewModel";
import {ApplyEffects, } from "@/public/model/effects/decorator/DecoratorFunctions";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class DiceRollSpecification extends AbstractEffectViewModel{
    @JsonProperty({name: 'diceCount'})
    private _diceCount: number;
    @JsonProperty({name: 'bonus'})
    private _bonus?: number;
    @JsonProperty({name: 'diceType'})
    private _diceType: number;

    constructor(
        diceCount: number,
        diceType: number,
        bonus?: number
    ) {
        super()
        this._diceCount = diceCount;
        this._diceType = diceType;
        this._bonus = bonus;
    }

    @ApplyEffects
    get diceCount(): number {
        return this._diceCount;
    }

    set diceCount(value: number) {
        this._diceCount = value;
    }

    get diceType(): number {
        return this._diceType;
    }

    set diceType(value: number) {
        this._diceType = value;
    }

    get bonus(): number {
        return this._bonus;
    }

    set bonus(value: number) {
        this._bonus = value;
    }

    getFormattedDiceType(): string {
        if (!this._diceType) {
            return '';
        }
        return String(this._diceType);
    }

    getFormattedDiceCount(): string {
        if (!this.diceCount) {
            return '';
        }
        return String(this.diceCount)
    }

    getFormattedDiceBonus(): string {
        if (this._bonus == null) {
            return '';
        }
        return String(this._bonus)
    }

    getDiceTypePlusBonusAsString(): string {
        if (!this.bonus) {
            return `${this.diceType}`
        }
        if (this.bonus && this.bonus > 0) {
            return `${this.diceType}+${this.bonus}`
        }
        return `${this.diceType}${this.bonus}`
    }

    getFullDiceRollString(): string {
        if (!this.bonus) {
            return `${this.diceCount}d${this.diceType}`
        }
        if (this.bonus && this.bonus > 0) {
            return `${this.diceCount}d${this.diceType}+${this.bonus}`
        }
        return `${this.diceCount}d${this.diceType}${this.bonus}`
    }

}