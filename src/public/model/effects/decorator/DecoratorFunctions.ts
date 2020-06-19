import {EffectCollection} from "@/public/model/effects/EffectCollection";
import {BooleanEffect} from "@/public/model/effects/BooleanEffect";
import {HttpService} from "@/public/service/HttpService";
import {LoggingService} from "@/public/service/LoggingService";
import {EffectDataToEffectCollectionMapper} from "@/public/mapping/EffectDataToEffectCollectionMapper";

const httpService = new HttpService();
const loggingService = new LoggingService();
const effectDataToEffectCollectionMapper = new EffectDataToEffectCollectionMapper();
/**
 * This function is a decorator function to populate the effects property with effects associated to this class
 * Effects need to have been persisted in the database with this class as its associated class for them to be added
 * to its collection.
 *
 * @param constructor
 * @constructor
 */
export const EffectClass = <T extends { new(...args: any[]): {} }>(constructor: T) => {
    const effects = Promise.resolve(httpService.get(`/V1/effect/${constructor.name}`));
    let parsedEffects = null;
    effects.then(effectData => {
        parsedEffects = effectDataToEffectCollectionMapper.mapForSingleClass(effectData);
    })
    return class extends constructor {
        effects = parsedEffects;
    }
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
