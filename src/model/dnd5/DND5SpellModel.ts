import {SpellComponentEnum} from "../SpellComponentEnum";
import {MagicSchoolEnum} from "../enumeration/dnd5/MagicSchoolEnum";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class DND5SpellModel {
    @JsonProperty({name: 'id'})
    private readonly _id: string;
    @JsonProperty({name: 'name'})
    private readonly _name: string;
    @JsonProperty({name: 'description'})
    private readonly _description: string;
    @JsonProperty({name: 'range'})
    private readonly _range: string;
    @JsonProperty({name: 'components'})
    private readonly _components: SpellComponentEnum[];
    @JsonProperty({name: 'canBeCastAsRitual'})
    private readonly _canBeCastAsRitual: boolean;
    @JsonProperty({name: 'duration'})
    private readonly _duration: string;
    @JsonProperty({name: 'needsConcentration'})
    private readonly _needsConcentration: boolean;
    @JsonProperty({name: 'castingTime'})
    private readonly _castingTime: string;
    @JsonProperty({name: 'school'})
    private readonly _school: MagicSchoolEnum;
    @JsonProperty({name: 'level'})
    private readonly _level: number;
    @JsonProperty({name: 'materials'})
    private readonly _materials?: string;
    @JsonProperty({name: 'higherLevelsDescription'})
    private readonly _higherLevelsDescription?: string;

    constructor(
        id: string,
        name: string,
        description: string,
        range: string,
        components: SpellComponentEnum[],
        canBeCastAsRitual: boolean,
        duration: string,
        needsConcentration: boolean,
        castingTime: string,
        school: MagicSchoolEnum,
        level: number,
        materials?: string,
        higherLevelsDescription?: string,
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._range = range;
        this._components = components;
        this._canBeCastAsRitual = canBeCastAsRitual;
        this._duration = duration;
        this._needsConcentration = needsConcentration;
        this._castingTime = castingTime;
        this._school = school;
        this._level = level;
        this._materials = materials;
        this._higherLevelsDescription = higherLevelsDescription;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get range(): string {
        return this._range;
    }

    get components(): SpellComponentEnum[] {
        return this._components;
    }

    get canBeCastAsRitual(): boolean {
        return this._canBeCastAsRitual;
    }

    get duration(): string {
        return this._duration;
    }

    get needsConcentration(): boolean {
        return this._needsConcentration;
    }

    get castingTime(): string {
        return this._castingTime;
    }

    get school(): MagicSchoolEnum {
        return this._school;
    }

    get level(): number {
        return this._level;
    }

    get materials(): string {
        return this._materials;
    }

    get higherLevelsDescription(): string {
        return this._higherLevelsDescription;
    }
}