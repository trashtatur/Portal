import {JsonProperty, Serializable} from "typescript-json-serializer";
import {PersonViewModel} from "@/public/model/PersonViewModel";

@Serializable()
export class SceneViewModel{
    @JsonProperty({name: 'id'})
    private _id?: string;
    @JsonProperty({name: 'number'})
    private _number = null;
    @JsonProperty({name: 'name'})
    private _name = '';
    @JsonProperty({name: 'hook'})
    private _hook = '';
    @JsonProperty({name: 'token'})
    private _token = '';
    @JsonProperty({name: 'act'})
    private _act = null;
    @JsonProperty({name: 'resolve'})
    private _resolve = '';
    @JsonProperty({name: 'parentScenes', type: SceneViewModel})
    private _parentScenes: SceneViewModel[] = [];
    @JsonProperty({name: 'additionalDescription'})
    private _additionalDescription = '';
    @JsonProperty({name: 'images'})
    private _images: string[] = [];
    @JsonProperty({name: 'treasure'})
    private _treasure = '';
    @JsonProperty({name: 'adventureId'})
    private _adventureId?: string;
    @JsonProperty({name: 'persons', type: PersonViewModel})
    private _persons?: PersonViewModel[] = []

    constructor(
        id?: string,
        adventureId?: string,
        number: number = null,
        name = '',
        hook = '',
        token = '',
        act: number = null,
        resolve = '',
        parentScenes: SceneViewModel[] = [],
        additionalDescription = '',
        images: string[] = [],
        treasure = '',
        persons: PersonViewModel[] = [],
    ) {
        this._id = id;
        this._adventureId = adventureId;
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
        this._persons = persons;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get adventureId(): string {
        return this._adventureId;
    }

    set adventureId(value: string) {
        this._adventureId = value;
    }

    get number(): number {
        return this._number;
    }

    set number(value: number) {
        this._number = value;
    }

    getNumberAsString = (): string  =>{
        if (this._number === null) {
            return ''
        }
        return `${this._number}`
    };

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get hook(): string {
        return this._hook;
    }

    set hook(value: string) {
        this._hook = value;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }

    get act(): number {
        return this._act;
    }

    set act(value: number) {
        this._act = value;
    }

    getActAsString = (): string => {
        if (this._act === null) {
            return ''
        }
        return `${this._act}`
    };

    get resolve(): string {
        return this._resolve;
    }

    set resolve(value: string) {
        this._resolve = value;
    }

    get parentScenes(): SceneViewModel[] {
        return this._parentScenes;
    }

    set parentScenes(value: SceneViewModel[]) {
        this._parentScenes = value;
    }

    get additionalDescription(): string {
        return this._additionalDescription;
    }

    set additionalDescription(value: string) {
        this._additionalDescription = value;
    }

    get images(): string[] {
        return this._images;
    }

    set images(value: string[]) {
        this._images = value;
    }

    get treasure(): string {
        return this._treasure;
    }

    set treasure(value: string) {
        this._treasure = value;
    }

    get persons(): PersonViewModel[] {
        return this._persons;
    }

    set persons(value: PersonViewModel[]) {
        this._persons = value;
    }
}