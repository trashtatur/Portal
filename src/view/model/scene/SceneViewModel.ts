export class SceneViewModel{
    private _id?: string;
    private _number = null;
    private _name = '';
    private _hook = '';
    private _token = '';
    private _act = '';
    private _resolve = '';
    private _childScenes: Array<SceneViewModel> = [];
    private _parentScenes: Array<SceneViewModel> = [];
    private _additionalDescription = '';
    private _images: Array<string> = [];
    private _treasure = '';

    constructor(
        id?: string,
        number: number = null,
        name = '',
        hook = '',
        token = '',
        act = '',
        resolve = '',
        childScenes: Array<SceneViewModel> = [],
        parentScenes: Array<SceneViewModel> = [],
        additionalDescription = '',
        images: Array<string> = [],
        treasure = '',
    ) {
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

    set id(value: string) {
        this._id = value;
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

    get act(): string {
        return this._act;
    }

    set act(value: string) {
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

    get childScenes(): Array<SceneViewModel> {
        return this._childScenes;
    }

    set childScenes(value: Array<SceneViewModel>) {
        this._childScenes = value;
    }

    get parentScenes(): Array<SceneViewModel> {
        return this._parentScenes;
    }

    set parentScenes(value: Array<SceneViewModel>) {
        this._parentScenes = value;
    }

    get additionalDescription(): string {
        return this._additionalDescription;
    }

    set additionalDescription(value: string) {
        this._additionalDescription = value;
    }

    get images(): Array<string> {
        return this._images;
    }

    set images(value: Array<string>) {
        this._images = value;
    }

    get treasure(): string {
        return this._treasure;
    }

    set treasure(value: string) {
        this._treasure = value;
    }
}