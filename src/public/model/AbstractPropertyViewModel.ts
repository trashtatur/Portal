import {EffectCollection} from "@/public/model/dataModel/EffectCollection";

export class AbstractPropertyViewModel {
    private _effects: EffectCollection = new EffectCollection([])

    get effects(): EffectCollection {
        return this._effects;
    }

    set effects(value: EffectCollection) {
        this._effects = value;
    }
}

export const ApplyEffects = (target: Record<string, any>, propertyKey: string): PropertyDescriptor => {
    let value = target[propertyKey];
    const getter = function () {
        if (!this && !(this.effects instanceof EffectCollection)) {
            console.log('This class does not use effects')
            return value;
        }
        console.log(this.effects)
        return value;
    }

    const setter = function (param) {
        value = param;
    }

    return {
        get: getter,
        set: setter,
        enumerable: false,
        configurable: true
    };
}