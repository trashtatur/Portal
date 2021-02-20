import {JsonProperty, Serializable} from "typescript-json-serializer";
import {EffectInterface} from "@/public/model/status/effect/EffectInterface";
import {PercentageEffect} from "@/public/model/status/effect/PercentageEffect";
import {TextEffect} from "@/public/model/status/effect/TextEffect";
import {NumericalEffect} from "@/public/model/status/effect/NumericalEffect";
import {BooleanEffect} from "@/public/model/status/effect/BooleanEffect";

const effectType = (value) => {
    if (value['percentageAmount']) {
        return PercentageEffect
    }
    if (value['value'] && value['from']) {
        return TextEffect
    }
    if (value['amount'] && value['from']) {
        return NumericalEffect
    }
    return BooleanEffect
}

@Serializable()
export class StatusEffectViewModel {

    @JsonProperty({name: 'statusName'})
    private _statusName: string

    @JsonProperty({name: 'effects', predicate: effectType})
    private _effects: EffectInterface<any>[];

    get effects(): EffectInterface<any>[] {
        return this._effects;
    }

    set effects(value: EffectInterface<any>[]) {
        this._effects = value;
    }

    get statusName(): string {
        return this._statusName;
    }
}