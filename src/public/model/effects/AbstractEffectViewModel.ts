import {EffectCollection} from "@/public/model/effects/EffectCollection";
import {EffectClass} from "@/public/model/effects/decorator/DecoratorFunctions";

@EffectClass
export class AbstractEffectViewModel {
   private _effects: EffectCollection = new EffectCollection([])

    get effects(): EffectCollection {
        return this._effects;
    }

    set effects(value: EffectCollection) {
        this._effects = value;
    }
}