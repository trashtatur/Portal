import {EffectInterface} from "./EffectInterface";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class BooleanEffect implements EffectInterface<boolean>{
    @JsonProperty({name: 'value'})
    private _value: boolean;
    @JsonProperty({name: 'from'})
    private _from: string;
    @JsonProperty({name: 'active'})
    private _active: boolean;

    constructor(
        value: boolean,
        from: string
    ) {
        this._value = value;
        this._from = from;
    }

    applyEffect = (value: boolean): boolean => {
        return this.value;
    }

    get value(): boolean {
        return this._value;
    }

    set value(value: boolean) {
        this._value = value;
    }

    get from(): string {
        return this._from;
    }

    set from(value: string) {
        this._from = value;
    }

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }
}