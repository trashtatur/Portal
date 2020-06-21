import {EffectInterface} from "@/public/model/effects/EffectInterface";

export class PercentageEffect implements EffectInterface<number>{
    private _will: "add" | "subtract";
    private _percentageAmount: number;
    private _from: string;
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