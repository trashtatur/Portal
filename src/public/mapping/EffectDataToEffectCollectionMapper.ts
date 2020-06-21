import {EffectCollection} from "@/public/model/effects/EffectCollection";
import {effectDataCollection} from "@/public/types/frontendTypes";
import {NumericalEffect} from "@/public/model/effects/NumericalEffect";

export class EffectDataToEffectCollectionMapper {

    mapForSingleClass = (effectData: effectDataCollection): EffectCollection => {
        return new EffectCollection([new NumericalEffect('effect 1', 'add', 4, 'value')])
    }
}