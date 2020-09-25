import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class SenseModel {
    @JsonProperty({name: 'name'})
    private readonly _name: string;
    @JsonProperty({name: 'value'})
    private readonly _value: string;

    constructor(
        name: string,
        value: string
    ) {
        this._name = name;
        this._value = value;
    }

    get name(): string {
        return this._name;
    }

    get value(): string {
        return this._value;
    }
}