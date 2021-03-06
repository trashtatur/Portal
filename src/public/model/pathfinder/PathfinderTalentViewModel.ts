import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class PathfinderTalentViewModel {
    @JsonProperty({name: 'id'})
    private _id: string;
    @JsonProperty({name: 'name'})
    private _name: string;
    @JsonProperty({name: 'type'})
    private _type: string;
    @JsonProperty({name: 'description'})
    private _description: string;
    @JsonProperty({name: 'benefits'})
    private _benefits: string;
    @JsonProperty({name: 'conditions'})
    private _conditions?: string;
    @JsonProperty({name: 'note'})
    private _note?: string;

    constructor(
        id: string,
        name: string,
        type: string,
        description: string,
        benefits: string,
        conditions?: string,
        note?: string
    ) {
        this._id = id;
        this._name = name;
        this._type = type;
        this._description = description;
        this._benefits = benefits;
        this._conditions = conditions;
        this._note = note;
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

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get benefits(): string {
        return this._benefits;
    }

    set benefits(value: string) {
        this._benefits = value;
    }

    get conditions(): string {
        return this._conditions;
    }

    set conditions(value: string) {
        this._conditions = value;
    }

    get note(): string {
        return this._note;
    }

    set note(value: string) {
        this._note = value;
    }
}