import {ModelInterface} from "./ModelInterface";
import {SceneModel} from "./SceneModel";
import {PersonModel} from "./PersonModel";

export class AdventureModel implements ModelInterface {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _core: string;
    private readonly _scenes?: SceneModel[];
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
