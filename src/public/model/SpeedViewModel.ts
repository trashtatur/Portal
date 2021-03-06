import {ApplyEffects} from "@/public/model/status/decorator/DecoratorFunctions";

export class SpeedViewModel {
    private _land: number;
    private _water: number;
    private _air: number;
    constructor(
        land: number,
        water: number,
        air: number
    ) {
        this._land = land;
        this._water = water;
        this._air = air;
    }

    @ApplyEffects
    get land(): number {
        return this._land;
    }

    set land(value: number) {
        this._land = value;
    }

    @ApplyEffects
    get water(): number {
        return this._water;
    }

    set water(value: number) {
        this._water = value;
    }

    @ApplyEffects
    get air(): number {
        return this._air;
    }

    set air(value: number) {
        this._air = value;
    }
}