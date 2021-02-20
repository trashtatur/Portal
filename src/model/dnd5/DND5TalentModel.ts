import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class DND5TalentModel {
    @JsonProperty({name: 'id'})
    private readonly _id: string;
    @JsonProperty({name: 'name'})
    private readonly _name: string;
    @JsonProperty({name: 'condition'})
    private readonly _condition: string;
    @JsonProperty({name: 'benefit'})
    private readonly _benefit: string;

    constructor(
        id: string,
        name: string,
        condition: string,
        benefit: string
    ) {
        this._id = id;
        this._name = name;
        this._condition = condition;
        this._benefit = benefit;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get condition(): string {
        return this._condition;
    }

    get benefit(): string {
        return this._benefit;
    }
}