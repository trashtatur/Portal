import {StatusEffectViewModel} from "@/public/model/status/StatusEffectViewModel";
import {JsonProperty, Serializable} from "typescript-json-serializer";
import {StatusEffectClass} from "@/public/model/status/decorator/DecoratorFunctions";

@Serializable()
@StatusEffectClass
export class StatusEffectAware {
    @JsonProperty({name: 'statusEffects', type: StatusEffectViewModel})
    private _statusEffects: StatusEffectViewModel[]

    get statusEffects(): StatusEffectViewModel[] {
        return this._statusEffects;
    }

    set statusEffects(value: StatusEffectViewModel[]) {
        this._statusEffects = value;
    }
}
