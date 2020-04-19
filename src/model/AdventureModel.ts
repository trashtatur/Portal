import {ModelInterface} from "./ModelInterface";
import {SceneModel} from "./SceneModel";

export class AdventureModel implements ModelInterface {
    private readonly _scenes: SceneModel[];
    private readonly _id: string;
    private readonly _name: string;
    private readonly _core: string;

    constructor(
        id: string,
        name: string,
        core: string,
        scenes: SceneModel[]
    ) {
        this._id = id;
        this._name = name;
        this._core = core;
        this._scenes = scenes;
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
}
