import {ModelInterface} from "./ModelInterface";
import {AdventureModel} from "./AdventureModel";
import {SceneModel} from "./SceneModel";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class PersonModel implements ModelInterface{
    @JsonProperty({name: 'id'})
    private readonly _id: string;
    @JsonProperty({name: 'name'})
    private readonly _name: string;
    @JsonProperty({name: 'type'})
    private readonly _type: string;
    @JsonProperty({name: 'needs'})
    private readonly _needs: string;
    @JsonProperty({name: 'desires'})
    private readonly _desires: string;
    @JsonProperty({name: 'weaknesses'})
    private readonly _weaknesses: string;
    @JsonProperty({name: 'enemies'})
    private readonly _enemies: string;
    @JsonProperty({name: 'image'})
    private readonly _image?: string;
    @JsonProperty({name: 'customFields'})
    private readonly _customFields?: Map<string, string>;
    @JsonProperty({name: 'additionalDescription'})
    private readonly _additionalDescription?: string;
    @JsonProperty({name: 'adventures'})
    private readonly _adventures?: Array<AdventureModel>;
    @JsonProperty({name: 'scenes'})
    private readonly _scenes?: Array<SceneModel>;

    constructor(
        id: string,
        name: string,
        type: string,
        needs: string,
        desires: string,
        weaknesses: string,
        enemies: string,
        image?: string,
        customFields?: Map<string, string>,
        additionalDescription?: string,
        adventures?: Array<AdventureModel>,
        scenes?: Array<SceneModel>
    ) {
        this._id = id;
        this._name = name;
        this._type = type;
        this._needs = needs;
        this._desires = desires;
        this._weaknesses = weaknesses;
        this._enemies = enemies;
        this._image = image;
        this._customFields = customFields;
        this._additionalDescription = additionalDescription;
        this._adventures = adventures;
        this._scenes = scenes;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get type(): string {
        return this._type;
    }

    get needs(): string {
        return this._needs;
    }

    get desires(): string {
        return this._desires;
    }

    get weaknesses(): string {
        return this._weaknesses;
    }

    get enemies(): string {
        return this._enemies;
    }

    get image(): string {
        return this._image;
    }

    get customFields(): Map<string, string> {
        return this._customFields;
    }

    get additionalDescription(): string {
        return this._additionalDescription;
    }

    get adventures(): Array<AdventureModel> {
        return this._adventures;
    }

    get scenes(): Array<SceneModel> {
        return this._scenes;
    }
}