import {ModelInterface} from "./ModelInterface";
import {SceneModel} from "./SceneModel";
import {PersonModel} from "./PersonModel";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class AdventureModel implements ModelInterface {
    @JsonProperty({name: 'id'})
    private readonly _id: string;
    @JsonProperty({name: 'name'})
    private readonly _name: string;
    @JsonProperty({name: 'core'})
    private readonly _core: string;
    @JsonProperty({name: 'scenes'})
    private readonly _scenes?: SceneModel[];
    @JsonProperty({name: 'persons'})
    private readonly _persons?: PersonModel[];

    constructor(
        id: string,
        name: string,
        core: string,
        scenes?: SceneModel[],
        persons?: PersonModel[]
    ) {
        this._id = id;
        this._name = name;
        this._core = core;
        this._scenes = scenes;
        this._persons = persons;
    }

    get scenes(): SceneModel[] {
        return this._scenes;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get core(): string {
        return this._core;
    }

    get persons(): PersonModel[] {
        return this._persons;
    }
}
