import {ModelInterface} from "./ModelInterface";
import {PropertyModel} from "./PropertyModel";

export class CreatureModel<T extends PropertyModel> implements ModelInterface{
    private readonly _id: string;
    private readonly _name: string;
    private readonly _creatureProperties: T;

    constructor(
        id: string,
        name: string,
        creatureProperties: T
    ) {
        this._creatureProperties = creatureProperties;
        this._id = id;
        this._name = name;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get creatureProperties(): T {
        return this._creatureProperties;
    }
}