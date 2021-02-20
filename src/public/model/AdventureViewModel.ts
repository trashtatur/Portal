import {SceneViewModel} from "./SceneViewModel";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class AdventureViewModel {
    @JsonProperty({name: 'id'})
    private _id = '';
    @JsonProperty({name: 'name'})
    private _name = '';
    @JsonProperty({name: 'core'})
    private _core = '';
    @JsonProperty({name: 'scenes', type: SceneViewModel})
    private _scenes: SceneViewModel[] = [];

    constructor(
        id = '',
        name = '',
        core = '',
        scenes: Array<SceneViewModel> = []
    ) {
        this._id = id;
        this._name = name;
        this._core = core;
        this._scenes = scenes;
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

    get core(): string {
        return this._core;
    }

    set core(value: string) {
        this._core = value;
    }

    get scenes(): Array<SceneViewModel> {
        return this._scenes;
    }

    set scenes(value: Array<SceneViewModel>) {
        this._scenes = value;
    }
}