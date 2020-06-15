import {Effect} from "@/public/model/dataModel/Effect";

export class EffectCollection {
    private _effects: Effect[];
    constructor(
        effects: Effect[]
    ) {
        this._effects = effects;
    }

    get effects(): Effect[] {
        return this._effects;
    }

    set effects(value: Effect[]) {
        this._effects = value;
    }
}