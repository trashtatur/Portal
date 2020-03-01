import {ModelInterface} from "./ModelInterface";
import {AttackProperty} from "./dataModel/AttackProperty";
import {Alignment} from "./dataModel/Alignment";
import {CreatureType} from "./dataModel/CreatureType";
import {CreatureSize} from "./dataModel/CreatureSize";
import {CreatureStats} from "./dataModel/CreatureStats";
import {SavingThrows} from "./dataModel/SavingThrows";
import {ActionModel} from "./ActionModel";
import {LanguageModel} from "./LanguageModel";
import {SkillModel} from "./SkillModel";
import {TalentModel} from "./TalentModel";

class CreatureModel implements ModelInterface{
    private readonly _name: string;
    private readonly _type: CreatureType;
    private readonly _armorclass: number;
    private readonly _hitpoints: number;
    private readonly _alignment: Alignment;
    private readonly _creatureClass: string;
    private readonly _challenge: number;
    private readonly _movement: number;
    private readonly _ini: number;
    private readonly _baseAtk: number;
    private readonly _size: CreatureSize;
    private readonly _stats: CreatureStats;
    private readonly _kmv: number;
    private readonly _kmb: number;
    private readonly _sizemod: number;
    private readonly _saveThrows: SavingThrows;
    private readonly _xp?: number;
    private readonly _image?: string;
    private readonly _actions?: ActionModel[];
    private readonly _languages?: LanguageModel[];
    private readonly _skills?: SkillModel[];
    private readonly _talents?: TalentModel[];
    private readonly _attackProperties?: AttackProperty[];

    constructor(
        name: string,
        type: CreatureType,
        armorclass: number,
        hitpoints: number,
        alignment: Alignment,
        creatureClass: string,
        challenge: number,
        movement: number,
        ini: number,
        baseAtk: number,
        size: CreatureSize,
        stats: CreatureStats,
        kmv: number,
        kmb: number,
        sizemod: number,
        saveThrows: SavingThrows,
        xp?: number,
        image?: string,
        actions?: ActionModel[],
        languages?: LanguageModel[],
        skills?: SkillModel[],
        talents?: TalentModel[],
        attackProperties?: AttackProperty[],
    ) {
        this._name = name;
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
        this._kmv = kmv;
        this._kmb = kmb;
        this._sizemod = sizemod;
        this._saveThrows = saveThrows;
        this._xp = xp;
        this._image = image;
        this._actions = actions;
        this._languages = languages;
        this._skills = skills;
        this._talents = talents;
        this._attackProperties = attackProperties;
    }

    get name(): string {
        return this._name;
    }

    get type(): CreatureType {
        return this._type;
    }

    get armorclass(): number {
        return this._armorclass;
    }

    get hitpoints(): number {
        return this._hitpoints;
    }

    get alignment(): Alignment {
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

    get size(): CreatureSize {
        return this._size;
    }

    get stats(): CreatureStats {
        return this._stats;
    }

    get kmv(): number {
        return this._kmv;
    }

    get kmb(): number {
        return this._kmb;
    }

    get sizemod(): number {
        return this._sizemod;
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

    get actions(): ActionModel[] {
        return this._actions;
    }

    get languages(): LanguageModel[] {
        return this._languages;
    }

    get skills(): SkillModel[] {
        return this._skills;
    }

    get talents(): TalentModel[] {
        return this._talents;
    }

    get attackProperties(): AttackProperty[] {
        return this._attackProperties;
    }
}