import {AbstractCreaturePropertyModel} from "../AbstractCreaturePropertyModel";
import {TypeEnum} from "../enumeration/TypeEnum";
import {AlignmentEnum} from "../enumeration/AlignmentEnum";
import {PathfinderCreatureSizeEnum} from "../enumeration/pathfinder/PathfinderCreatureSizeEnum";
import {CreatureStatsModel} from "../CreatureStatsModel";
import {PathfinderSavingThrowsModel} from "./PathfinderSavingThrowsModel";
import {PathfinderActionModel} from "./PathfinderActionModel";
import {PathfinderLanguageModel} from "./PathfinderLanguageModel";
import {PathfinderSkillModel} from "./PathfinderSkillModel";
import {PathfinderTalentModel} from "./PathfinderTalentModel";
import {NamedCreatureProperty} from "../NamedCreatureProperty";
import {JsonProperty, Serializable} from "typescript-json-serializer";
import {getEnumKeyForValue} from "../../helper/HelperFunctions";

@Serializable()
export class PathfinderCreaturePropertiesModel extends AbstractCreaturePropertyModel{

    @JsonProperty({name: 'id'})
    private readonly _id: string;
    @JsonProperty({name: 'type', onDeserialize: (data) =>  getEnumKeyForValue(data, TypeEnum)})
    private readonly _type: TypeEnum;
    @JsonProperty({name: 'armorclass'})
    private readonly _armorclass: number;
    @JsonProperty({name: 'hitpoints'})
    private readonly _hitpoints: number;
    @JsonProperty({name: 'alignment', onDeserialize: (data) => getEnumKeyForValue(data, AlignmentEnum)})
    private readonly _alignment: AlignmentEnum;
    @JsonProperty({name: 'creatureClass'})
    private readonly _creatureClass: string;
    @JsonProperty({name: 'challenge'})
    private readonly _challenge: number;
    @JsonProperty({name: 'movement'})
    private readonly _movement: number;
    @JsonProperty({name: 'ini'})
    private readonly _ini: number;
    @JsonProperty({name: 'baseAtk'})
    private readonly _baseAtk: number;
    @JsonProperty({name: 'size', onDeserialize: (data) => getEnumKeyForValue(data, PathfinderCreatureSizeEnum)})
    private readonly _size: PathfinderCreatureSizeEnum;
    @JsonProperty({name: 'stats'})
    private readonly _stats: CreatureStatsModel;
    @JsonProperty({name: 'saveThrows'})
    private readonly _saveThrows: PathfinderSavingThrowsModel;
    @JsonProperty({name: 'xp'})
    private readonly _xp?: number;
    @JsonProperty({name: 'image'})
    private readonly _image?: string;
    @JsonProperty({name: 'actions'})
    private readonly _actions?: PathfinderActionModel[];
    @JsonProperty({name: 'languages'})
    private readonly _languages?: PathfinderLanguageModel[];
    @JsonProperty({name: 'skills'})
    private readonly _skills?: PathfinderSkillModel[];
    @JsonProperty({name: 'talents'})
    private readonly _talents?: PathfinderTalentModel[];
    @JsonProperty({name: 'attackProperties'})
    private readonly _attackProperties?: NamedCreatureProperty[];


    constructor(
        id: string,
        type: TypeEnum,
        armorclass: number,
        hitpoints: number,
        alignment: AlignmentEnum,
        creatureClass: string,
        challenge: number,
        movement: number,
        ini: number,
        baseAtk: number,
        size: PathfinderCreatureSizeEnum,
        stats: CreatureStatsModel,
        saveThrows: PathfinderSavingThrowsModel,
        xp?: number,
        image?: string,
        actions?: PathfinderActionModel[],
        languages?: PathfinderLanguageModel[],
        skills?: PathfinderSkillModel[],
        talents?: PathfinderTalentModel[],
        attackProperties?: NamedCreatureProperty[],
    ) {
        super();
        this._id = id;
        this._type = type;
        this._armorclass = armorclass;
        this._hitpoints = hitpoints;
        this._alignment = alignment;
        this._creatureClass = creatureClass;
        this._challenge = challenge;
        this._movement = movement;
        this._ini = ini;
        this._baseAtk = baseAtk;
        this._size = size;
        this._stats = stats;
        this._saveThrows = saveThrows;
        this._xp = xp;
        this._image = image;
        this._actions = actions;
        this._languages = languages;
        this._skills = skills;
        this._talents = talents;
        this._attackProperties = attackProperties;
    }

    get id(): string {
        return this._id;
    }

    get type(): TypeEnum {
        return this._type;
    }

    get armorclass(): number {
        return this._armorclass;
    }

    get hitpoints(): number {
        return this._hitpoints;
    }

    get alignment(): AlignmentEnum {
        return this._alignment;
    }

    get creatureClass(): string {
        return this._creatureClass;
    }

    get challenge(): number {
        return this._challenge;
    }

    get movement(): number {
        return this._movement;
    }

    get ini(): number {
        return this._ini;
    }

    get baseAtk(): number {
        return this._baseAtk;
    }

    get size(): PathfinderCreatureSizeEnum {
        return this._size;
    }

    get stats(): CreatureStatsModel {
        return this._stats;
    }

    get saveThrows(): PathfinderSavingThrowsModel {
        return this._saveThrows;
    }

    get xp(): number {
        return this._xp;
    }

    get image(): string {
        return this._image;
    }

    get actions(): PathfinderActionModel[] {
        return this._actions;
    }

    get languages(): PathfinderLanguageModel[] {
        return this._languages;
    }

    get skills(): PathfinderSkillModel[] {
        return this._skills;
    }

    get talents(): PathfinderTalentModel[] {
        return this._talents;
    }

    get attackProperties(): NamedCreatureProperty[] {
        return this._attackProperties;
    }
}