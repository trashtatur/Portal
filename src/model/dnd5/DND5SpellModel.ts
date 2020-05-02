import {SpellComponentEnum} from "../dataModel/SpellComponentEnum";
import {MagicSchoolEnum} from "../enumeration/dnd5/MagicSchoolEnum";

export class DND5SpellModel {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _description: string;
    private readonly _range: string;
    private readonly _components: SpellComponentEnum[];
    private readonly _canBeCastAsRitual: boolean;
    private readonly _duration: string;
    private readonly _needsConcentration: boolean;
    private readonly _castingTime: string;
    private readonly _school: MagicSchoolEnum;
    private readonly _materials?: string[];
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
        materials?: string[],
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

    get materials(): string[] {
        return this._materials;
    }

    get higherLevelsDescription(): string {
        return this._higherLevelsDescription;
    }
}