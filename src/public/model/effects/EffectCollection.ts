import {EffectInterface} from "@/public/model/effects/EffectInterface";

export class EffectCollection {
    private _effects: EffectInterface<any>[];
    constructor(
        effects: EffectInterface<any>[]
    ) {
        this._effects = effects;
    }

    get effects(): EffectInterface<any>[] {
        return this._effects;
    }

    set effects(value: EffectInterface<any>[]) {
        this._effects = value;
    }
}