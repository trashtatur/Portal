import {ModelInterface} from "./ModelInterface";
import {PersonModel} from "./PersonModel";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class SceneModel implements ModelInterface {
    @JsonProperty({name: 'id'})
    private readonly _id: string;
    @JsonProperty({name: 'adventureId'})
    private readonly _adventureId: string;
    @JsonProperty({name: 'number'})
    private readonly _number: number;
    @JsonProperty({name: 'name'})
    private readonly _name: string;
    @JsonProperty({name: 'hook'})
    private readonly _hook: string;
    @JsonProperty({name: 'token'})
    private readonly _token: string;
    @JsonProperty({name: 'act'})
    private readonly _act: number;
    @JsonProperty({name: 'resolve'})
    private readonly _resolve: string;
    @JsonProperty({name: 'parentScenes'})
    private _parentScenes?: Array<SceneModel>;
    @JsonProperty({name: 'additionalDescription'})
    private readonly _additionalDescription?: string;
    @JsonProperty({name: 'images'})
    private readonly _images?: Array<string>;
    @JsonProperty({name: 'treasure'})
    private readonly _treasure?: string;
    @JsonProperty({name: 'persons'})
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
