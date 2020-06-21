import {AbstractPropertyViewModel} from "./AbstractPropertyViewModel";
import {ApplyEffects} from "@/public/model/effects/decorator/DecoratorFunctions";

export class CreatureViewModel<T extends AbstractPropertyViewModel> extends AbstractPropertyViewModel{
    private _id: string;
    private _name: string;
    private _properties: T;

    constructor(
        id: string,
        name: string,
        properties: T
    ) {
        super()
        this._properties = properties;
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

    get properties(): T {
        return this._properties;
    }

    set properties(value: T) {
        this._properties = value;
    }
}