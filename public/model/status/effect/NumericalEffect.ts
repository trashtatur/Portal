import {EffectInterface} from "./EffectInterface";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class NumericalEffect implements EffectInterface<number>{
    @JsonProperty({name: 'will'})
    private _will: "add" | "subtract";
    @JsonProperty({name: 'amount'})
    private _amount: number;
    @JsonProperty({name: 'from'})
    private _from: string;
    @JsonProperty({name: 'active'})
    private _active: boolean;

    constructor(
        will: "add" | "subtract",
        amount: number,
        from: string
    ) {
        this._will = will;
        this._amount = amount;
        this._from = from;
    }

    get will(): "add" | "subtract" {
        return this._will;
    }

    set will(value: "add" | "subtract") {
        this._will = value;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }

    get from(): string {
        return this._from;
    }

    set from(value: string) {
        this._from = value;
    }

    applyEffect = (value: number): number => {
        if (this.will === "subtract") {
            return value - this._amount
        }
        if (this.will === "add") {
            return value + this._amount
        }
    }

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }
}