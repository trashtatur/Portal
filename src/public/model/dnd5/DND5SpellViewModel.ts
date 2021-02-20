import {MagicSchoolEnum} from "@/public/model/enumeration/dnd5/MagicSchoolEnum";
import {SpellComponentEnum} from "@/public/model/enumeration/dnd5/SpellComponentEnum";
import {JsonProperty, Serializable} from "typescript-json-serializer";
import {string} from "prop-types";

@Serializable()
export class DND5SpellViewModel {
    @JsonProperty({name: 'id'})
    private _id: string;
    @JsonProperty({name: 'name'})
    private _name: string;
    @JsonProperty({name: 'description'})
    private _description: string;
    @JsonProperty({name: 'range'})
    private _range: string;
    @JsonProperty({name: 'components', type: string})
    private _components: SpellComponentEnum[];
    @JsonProperty({name: 'canBeCastAsRitual'})
    private _canBeCastAsRitual: boolean;
    @JsonProperty({name: 'duration'})
    private _duration: string;
    @JsonProperty({name: 'needsConcentration'})
    private _needsConcentration: boolean;
    @JsonProperty({name: 'castingTime'})
    private _castingTime: string;
    @JsonProperty({name: 'school'})
    private _school: MagicSchoolEnum;
    @JsonProperty({name: 'level'})
    private _level: number;
    @JsonProperty({name: 'materials'})
    private _materials?: string;
    @JsonProperty({name: 'higherLevelsDescription'})
    private _higherLevelsDescription?: string;

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
        higherLevelsDescription?: string
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

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get range(): string {
        return this._range;
    }

    set range(value: string) {
        this._range = value;
    }

    get components(): SpellComponentEnum[] {
        return this._components;
    }

    set components(value: SpellComponentEnum[]) {
        this._components = value;
    }

    get canBeCastAsRitual(): boolean {
        return this._canBeCastAsRitual;
    }

    set canBeCastAsRitual(value: boolean) {
        this._canBeCastAsRitual = value;
    }

    get duration(): string {
        return this._duration;
    }

    set duration(value: string) {
        this._duration = value;
    }

    get needsConcentration(): boolean {
        return this._needsConcentration;
    }

    set needsConcentration(value: boolean) {
        this._needsConcentration = value;
    }

    get castingTime(): string {
        return this._castingTime;
    }

    set castingTime(value: string) {
        this._castingTime = value;
    }

    get school(): MagicSchoolEnum {
        return this._school;
    }

    set school(value: MagicSchoolEnum) {
        this._school = value;
    }

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }

    get materials(): string {
        return this._materials;
    }

    set materials(value: string) {
        this._materials = value;
    }

    get higherLevelsDescription(): string {
        return this._higherLevelsDescription;
    }

    set higherLevelsDescription(value: string) {
        this._higherLevelsDescription = value;
    }
}