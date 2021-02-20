import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class DND5LanguageModel {
    @JsonProperty({name: 'id'})
    private readonly _id: string;
    @JsonProperty({name: 'name'})
    private readonly _name: string;

    constructor(
        id: string,
        name: string
    ) {
        this._id = id;
        this._name = name;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }
}