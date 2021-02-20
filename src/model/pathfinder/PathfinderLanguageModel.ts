import {ModelInterface} from "../ModelInterface";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class PathfinderLanguageModel implements ModelInterface {

    @JsonProperty({name: 'name'})
    private readonly _name: string;

    constructor(
        id: string,
        name: string,
    ) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }
}