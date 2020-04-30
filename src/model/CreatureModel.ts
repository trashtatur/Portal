import {ModelInterface} from "./ModelInterface";
import {AbstractCreaturePropertyModel} from "./AbstractCreaturePropertyModel";
import {GetParamToSystemEnum} from "../enumeration/GetParamToSystemEnum";

export class CreatureModel<T extends AbstractCreaturePropertyModel> implements ModelInterface{
    private readonly _id: string;
    private readonly _name: string;
    private _creatureProperties: T;
    private _propertyType: GetParamToSystemEnum

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

    set creatureProperties(value: T) {
        this._creatureProperties = value;
    }

    get propertyType(): GetParamToSystemEnum {
        return this._propertyType;
    }

    set propertyType(value: GetParamToSystemEnum) {
        this._propertyType = value;
    }
}