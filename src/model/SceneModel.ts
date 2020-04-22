import {ModelInterface} from "./ModelInterface";
import {PersonModel} from "./PersonModel";

export class SceneModel implements ModelInterface {
    private readonly _id: string;
    private readonly _adventureId: string;
    private readonly _number: number;
    private readonly _name: string;
    private readonly _hook: string;
    private readonly _token: string;
    private readonly _act: number;
    private readonly _resolve: string;
    private _parentScenes?: Array<SceneModel>;
    private readonly _additionalDescription?: string;
    private readonly _images?: Array<string>;
    private readonly _treasure?: string;
    private readonly _persons?: Array<PersonModel>;

    constructor(
        id: string,
        adventureId: string,
        number: number,
        name: string,
        hook: string,
        token: string,
        act: number,
        resolve: string,
        parentScenes?: Array<SceneModel>,
        additionalDescription?: string,
        images?: Array<string>,
        treasure?: string,
        persons?: Array<PersonModel>
    ) {
        this._persons = persons;
        this._adventureId = adventureId;
        this._id = id;
        this._number = number;
        this._name = name;
        this._hook = hook;
        this._token = token;
        this._act = act;
        this._resolve = resolve;
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

    get adventureId(): string {
        return this._adventureId;
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

    get act(): number {
        return this._act;
    }

    get resolve(): string {
        return this._resolve;
    }

    get parentScenes(): Array<SceneModel> {
        return this._parentScenes;
    }

    set parentScenes(value: Array<SceneModel>) {
        this._parentScenes = value;
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
