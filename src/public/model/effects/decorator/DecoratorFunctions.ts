import {EffectCollection} from "@/public/model/effects/EffectCollection";
import {LoggingService} from "@/public/service/LoggingService";
import 'reflect-metadata';

const loggingService = new LoggingService();

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
        if (value === undefined) {
            return null;
        }
        if (!this || !(this.effects instanceof EffectCollection)) {
            loggingService.debug(`${this.type} | This class does not use effects`, {caller: 'ApplyEffects'})
            return value;
        }
        for (const effect of this.effects.effects) {
            if (!effect.active) continue;
            if (effect.from === propertyKey) {
                value = effect.applyEffect(value);
                break;
            }
        }
        console.log(this.effects)
        return value;
    }

    const setter = function (param) {
        value = param;
        Reflect.set(this, `_${propertyKey}`, param);
    }
    return {
        get: getter,
        set: setter,
        enumerable: false,
        configurable: true
    };
}
