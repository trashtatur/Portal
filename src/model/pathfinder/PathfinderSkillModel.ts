import {ModelInterface} from "../ModelInterface";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class PathfinderSkillModel implements ModelInterface {
    @JsonProperty({name: 'id'})
    private readonly _id: string;
    @JsonProperty({name: 'name'})
    private readonly _name: string;
    @JsonProperty({name: 'level'})
    private readonly _level: number;

    constructor(
        id: string,
        name: string,
        level: number
    ) {
        this._id = id;
        this._name = name;
        this._level = level;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get level(): number {
        return this._level;
    }
}