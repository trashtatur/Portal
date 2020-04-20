import {ModelInterface} from "./ModelInterface";
import {PersonModel} from "./PersonModel";

export class SceneModel implements ModelInterface {
    private readonly _id: string;
    private readonly _number: number;
    private readonly _name: string;
    private readonly _hook: string;
    private readonly _token: string;
    private readonly _act: string;
    private readonly _resolve: string;
    private readonly _childScenes: Array<SceneModel>;
    private readonly _parentScenes?: Array<SceneModel>;
    private readonly _additionalDescription?: string;
    private readonly _images?: Array<string>;
    private readonly _treasure?: string;
    private readonly _persons?: Array<PersonModel>;

    constructor(
        id: string,
        number: number,
        name: string,
        hook: string,
        token: string,
        act: string,
        resolve: string,
        childScenes: Array<SceneModel>,
        parentScenes?: Array<SceneModel>,
        additionalDescription?: string,
        images?: Array<string>,
        treasure?: string,
        persons?: Array<PersonModel>
    ) {
        this._persons = persons;
        this._id = id;
        this._number = number;
        this._name = name;
        this._hook = hook;
        this._token = token;
        this._act = act;
        this._resolve = resolve;
        this._childScenes = childScenes;
        this._parentScenes = parentScenes;
        this._additionalDescription = additionalDescription;
        this._images = images;
        this._treasure = treasure;
    }

    get id(): string {
        return this._id;
    }

    get number(): number {
        return this._number;
    }

    get name(): string {
        return this._name;
    }

    get hook(): string {
        return this._hook;
    }

    get token(): string {
        return this._token;
    }

    get act(): string {
        return this._act;
    }

    get resolve(): string {
        return this._resolve;
    }

    get childScenes(): Array<SceneModel> {
        return this._childScenes;
    }

    get parentScenes(): Array<SceneModel> {
        return this._parentScenes;
    }

    get additionalDescription(): string {
        return this._additionalDescription;
    }

    get images(): Array<string> {
        return this._images;
    }

    get treasure(): string {
        return this._treasure;
    }

    get persons(): Array<PersonModel> {
        return this._persons;
    }
}
