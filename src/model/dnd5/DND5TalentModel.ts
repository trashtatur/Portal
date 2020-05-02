export class DND5TalentModel {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _condition: string;
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