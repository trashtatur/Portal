import {EffectInterface} from "@/public/model/status/effect/EffectInterface";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class PercentageEffect implements EffectInterface<number>{
    @JsonProperty({name: 'will'})
    private _will: "add" | "subtract";
    @JsonProperty({name: 'percentageAmount'})
    private _percentageAmount: number;
    @JsonProperty({name: 'from'})
    private _from: string;
    @JsonProperty({name: 'active'})
    private _active: boolean;

    constructor(
        will: "add" | "subtract",
        percentageAmount: number,
        from: string
    ) {
        this._will = will;
        this._percentageAmount = percentageAmount;
        this._from = from;
    }
    applyEffect = (value: number): number => {
        if (this.will === 'add') {
            return Math.floor(value + (value / 100) * this.percentageAmount);
        }
        return Math.floor(value - (value / 100) * this.percentageAmount);
    }

    get will(): "add" | "subtract" {
        return this._will;
    }

    set will(value: "add" | "subtract") {
        this._will = value;
    }

    get percentageAmount(): number {
        return this._percentageAmount;
    }

    set percentageAmount(value: number) {
        this._percentageAmount = value;
    }

    get from(): string {
        return this._from;
    }

    set from(value: string) {
        this._from = value;
    }

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }
}