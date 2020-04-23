import {ModelInterface} from "./ModelInterface";

export class TalentModel implements ModelInterface {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _type: string;
    private readonly _description: string;
    private readonly _benefits: string;
    private readonly _conditions?: string;
    private readonly _note?: string;

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

    get name(): string {
        return this._name;
    }

    get type(): string {
        return this._type;
    }

    get description(): string {
        return this._description;
    }

    get benefits(): string {
        return this._benefits;
    }

    get conditions(): string {
        return this._conditions;
    }

    get note(): string {
        return this._note;
    }
}