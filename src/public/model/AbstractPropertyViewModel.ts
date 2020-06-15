import {EffectCollection} from "@/public/model/effects/EffectCollection";
import {AbstractEffectViewModel} from "@/public/model/effects/AbstractEffectViewModel";

export class AbstractPropertyViewModel extends AbstractEffectViewModel{

}

/**
 * This function is a decorator function to apply effects to getters. This is used to portray statuses or traits.
 * The function expects the containing object to have a property called 'effects' which has to be an EffectCollection.
 * The contained Effects must reference properties in the object to resolve. They must also implement the EffectInterface
 * Else this function will not apply the effect correctly and return the value without the applied effect
 *
 * @param target
 * @param propertyKey
 */
export const ApplyEffects = (target: Record<string, any>, propertyKey: string): PropertyDescriptor => {
    let value = target[propertyKey];
    const getter = function () {
        if (!this && !(this.effects instanceof EffectCollection)) {
            console.log('This class does not use effects')
            return value;
        }
        for (const effect of this.effects.effects) {
            if (!effect.active) continue;
            if (effect.from === propertyKey) {
                value = effect.applyEffect(value);
                break;
            }
        }
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