import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class NamedPropertyViewModel {
    @JsonProperty({name: 'name'})
    private _name: string;
    @JsonProperty({name: 'property'})
    private _property: string;

    constructor(
        name: string,
        property: string
    ) {
        this._name = name;
        this._property = property;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get property(): string {
        return this._property;
    }

    set property(value: string) {
        this._property = value;
    }
}