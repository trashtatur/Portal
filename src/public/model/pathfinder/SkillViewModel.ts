import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class SkillViewModel {
    @JsonProperty({name: 'id'})
    private _id: string;
    @JsonProperty({name: 'name'})
    private _name: string;
    @JsonProperty({name: 'level'})
    private _level: number;

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

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }
}