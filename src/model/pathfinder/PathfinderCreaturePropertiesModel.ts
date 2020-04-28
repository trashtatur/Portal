import {PropertyModel} from "../PropertyModel";
import {CreatureTypeEnum} from "../enumeration/CreatureTypeEnum";
import {AlignmentEnum} from "../enumeration/AlignmentEnum";
import {CreatureSizeEnum} from "../enumeration/CreatureSizeEnum";
import {CreatureStats} from "../dataModel/CreatureStats";
import {SavingThrows} from "../dataModel/SavingThrows";
import {PathfinderActionModel} from "./PathfinderActionModel";
import {PathfinderLanguageModel} from "./PathfinderLanguageModel";
import {PathfinderSkillModel} from "./PathfinderSkillModel";
import {PathfinderTalentModel} from "./PathfinderTalentModel";
import {AttackProperty} from "../dataModel/AttackProperty";

export class PathfinderCreaturePropertiesModel extends PropertyModel{

    private readonly _id: string;
    private readonly _type: CreatureTypeEnum;
    private readonly _armorclass: number;
    private readonly _hitpoints: number;
    private readonly _alignment: AlignmentEnum;
    private readonly _creatureClass: string;
    private readonly _challenge: number;
    private readonly _movement: number;
    private readonly _ini: number;
    private readonly _baseAtk: number;
    private readonly _size: CreatureSizeEnum;
    private readonly _stats: CreatureStats;
    private readonly _saveThrows: SavingThrows;
    private readonly _xp?: number;
    private readonly _image?: string;
    private readonly _actions?: PathfinderActionModel[];
    private readonly _languages?: PathfinderLanguageModel[];
    private readonly _skills?: PathfinderSkillModel[];
    private readonly _talents?: PathfinderTalentModel[];
    private readonly _attackProperties?: AttackProperty[];


    constructor(
        id: string,
        type: CreatureTypeEnum,
        armorclass: number,
        hitpoints: number,
        alignment: AlignmentEnum,
        creatureClass: string,
        challenge: number,
        movement: number,
        ini: number,
        baseAtk: number,
        size: CreatureSizeEnum,
        stats: CreatureStats,
        saveThrows: SavingThrows,
        xp?: number,
        image?: string,
        actions?: PathfinderActionModel[],
        languages?: PathfinderLanguageModel[],
        skills?: PathfinderSkillModel[],
        talents?: PathfinderTalentModel[],
        attackProperties?: AttackProperty[],
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

    get type(): CreatureTypeEnum {
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

    get size(): CreatureSizeEnum {
        return this._size;
    }

    get stats(): CreatureStats {
        return this._stats;
    }

    get saveThrows(): SavingThrows {
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

    get attackProperties(): AttackProperty[] {
        return this._attackProperties;
    }
}