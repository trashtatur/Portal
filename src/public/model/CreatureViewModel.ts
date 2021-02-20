import {AbstractPropertyViewModel} from "./AbstractPropertyViewModel";
import {ApplyEffects} from "@/public/model/status/decorator/DecoratorFunctions";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class CreatureViewModel<T extends AbstractPropertyViewModel> extends AbstractPropertyViewModel{
    @JsonProperty({name: 'id'})
    private _id: string;
    @JsonProperty({name: 'name'})
    private _name: string;
    @JsonProperty({name: 'creatureProperties'})
    private _creatureProperties: T;

    constructor(
        id: string,
        name: string,
        properties: T
    ) {
        super()
        this._creatureProperties = properties;
        this._id = id;
        this._name = name;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    @ApplyEffects
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get creatureProperties(): T {
        return this._creatureProperties;
    }

    set creatureProperties(value: T) {
        this._creatureProperties = value;
    }
}