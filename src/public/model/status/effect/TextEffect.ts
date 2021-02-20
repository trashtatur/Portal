import {EffectInterface} from "@/public/model/status/effect/EffectInterface";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class TextEffect implements EffectInterface<string>{
    @JsonProperty({name: 'will'})
    private _will: "add" | "replace";
    @JsonProperty({name: 'value'})
    private _value: string;
    @JsonProperty({name: 'from'})
    private _from: string;
    @JsonProperty({name: 'active'})
    private _active: boolean;

    constructor(
        will: "add" | "replace",
        value: string,
        from: string,
    ) {
        this._will = will;
        this._value = value;
        this._from = from;
    }

    applyEffect = (value: string): string => {
        if (this.will === 'add') {
            return `${value} ${this.value}`
        }
        return value;
    }

    get will(): "add" | "replace" {
        return this._will;
    }

    set will(value: "add" | "replace") {
        this._will = value;
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
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