import {SceneViewModel} from "./SceneViewModel";

export class AdventureViewModel {
    private _id = '';
    private _name = '';
    private _core = '';
    private _scenes: Array<SceneViewModel> = [];

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