import {ModelInterface} from "./ModelInterface";
import {AbstractCreaturePropertyModel} from "./AbstractCreaturePropertyModel";
import {SystemEnum} from "../enumeration/SystemEnum";
import {JsonProperty, Serializable} from "typescript-json-serializer";
import {DND5CreaturePropertiesModel} from "./dnd5/DND5CreaturePropertiesModel";
import {PathfinderCreaturePropertiesModel} from "./pathfinder/PathfinderCreaturePropertiesModel";

const creaturePropertyType = (ref, creatureProperty) => {

}

@Serializable()
export class CreatureModel<T extends AbstractCreaturePropertyModel> implements ModelInterface{
    @JsonProperty({name: 'id'})
    private readonly _id: string;
    @JsonProperty({name: 'name'})
    private readonly _name: string;
    @JsonProperty({name: 'creatureProperties'})
    private _creatureProperties: T;
    @JsonProperty({name: 'propertyType'})
    private _propertyType: SystemEnum

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

    get propertyType(): SystemEnum {
        return this._propertyType;
    }

    set propertyType(value: SystemEnum) {
        this._propertyType = value;
    }
}