import {httpGet} from "@/public/service/HttpService";
import {LoggingService} from "@/public/service/LoggingService";
import 'reflect-metadata';
import {deserializeMultiple} from "@/public/service/SerializerService";
import {StatusEffectViewModel} from "@/public/model/status/StatusEffectViewModel";

const loggingService = new LoggingService();
/**
 * This function is a decorator function to populate the effects property with effects associated to this class
 * Effects need to have been persisted in the database with this class as its associated class for them to be added
 * to its collection.
 *
 * @param constructor
 * @constructor
 */
export const StatusEffectClass = <T extends { new(...args: any[]): {} }>(constructor: T) => {
    const statusEffects = Promise.resolve(httpGet(`/V1/statusEffect/${constructor.name}`));
    let parsedStatusEffects = null;
    statusEffects.then(statusData => {
        parsedStatusEffects = deserializeMultiple(statusData, StatusEffectViewModel);
    })
    return class extends constructor {
        statusEffects = parsedStatusEffects;
    }
}
/**
 * This function is a decorator function to apply effects to getters. This is used to portray statuses or traits.
 * The function expects the containing object to have a property called 'statusEffects' which has to be an array of StatusEffectViewModels.
 * The contained Effects must reference properties in the object to resolve. They must also implement the EffectInterface
 * Else this function will not apply the effect correctly and return the value without the applied effect
 *
 * @param target
 * @param propertyKey
 */
export const ApplyEffects = (target: Record<string, any>, propertyKey: string): PropertyDescriptor => {
    let value = target[propertyKey];
    Reflect.defineMetadata('applyEffects', true, target, propertyKey);
    const getter = function () {
        const reflectedValue = Reflect.get(this, `_${propertyKey}`);
        if (value === undefined) {
            if (reflectedValue === undefined || reflectedValue === null) {
                return null;
            }
        }
        if (!this
            || !this.statusEffects
            || this.statusEffects?.length === 0
            || !(this.statusEffects[0] instanceof StatusEffectViewModel)
        ) {
            loggingService.debug(`${this.constructor.name} | This class does not use effects`, {caller: 'ApplyEffects'});
            return reflectedValue;
        }
        for (const status of this.statusEffects) {
            const effects = status.effects;
            for (const effect of effects) {
                if (!effect.active) continue;
                if (effect.from === propertyKey) {
                    return effect.applyEffect(reflectedValue);
                }
            }
        }
        return reflectedValue;
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
