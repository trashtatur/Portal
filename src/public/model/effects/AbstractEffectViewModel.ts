import {EffectCollection} from "@/public/model/effects/EffectCollection";

export abstract class AbstractEffectViewModel {
    private _effects: EffectCollection = new EffectCollection([])

    get effects(): EffectCollection {
        return this._effects;
    }

    set effects(value: EffectCollection) {
        this._effects = value;
    }
}