import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class DND5SkillModel {
    @JsonProperty({name: 'id'})
    private readonly _id: string;
    @JsonProperty({name: 'name'})
    private readonly _name: string;
    @JsonProperty({name: 'skillLevel'})
    private readonly _skillLevel?: number;

    constructor(
        id: string,
        name: string,
        skillLevel?: number
    ) {
        this._skillLevel = skillLevel;
        this._id = id;
        this._name = name;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get skillLevel(): number {
        return this._skillLevel;
    }
}