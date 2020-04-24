import {CreatureTypeEnum} from "./enumeration/CreatureTypesEnum";
import {AlignmentEnum} from "./enumeration/AlignmentEnum";
import {CreatureSizeEnum} from "./enumeration/CreatureSizeEnum";
import {ActionViewModel} from "./ActionViewModel";
import {LanguageViewModel} from "./LanguageViewModel";
import {SkillViewModel} from "./SkillViewModel";
import {TalentViewModel} from "./TalentViewModel";
import {StatsViewModel} from "./dataModel/StatsViewModel";
import {SavingThrowsViewModel} from "./dataModel/SavingThrowsViewModel";
import {AttackPropertyViewModel} from "./dataModel/AttackPropertyViewModel";

export class CreatureViewModel {
    private _id: string;
    private _name: string;
    private _type: CreatureTypeEnum;
    private _armorclass: number;
    private _hitpoints: number;
    private _alignment: AlignmentEnum;
    private _creatureClass: string;
    private _challenge: number;
    private _movement: number;
    private _ini: number;
    private _baseAtk: number;
    private _size: CreatureSizeEnum;
    private _stats: StatsViewModel;
    private _saveThrows: SavingThrowsViewModel;
    private _xp?: number;
    private _image?: string;
    private _actions?: ActionViewModel[];
    private _languages?: LanguageViewModel[];
    private _skills?: SkillViewModel[];
    private _talents?: TalentViewModel[];
    private _attackProperties?: AttackPropertyViewModel[];
    constructor(
        id: string,
        name: string,
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
        stats: StatsViewModel,
        saveThrows: SavingThrowsViewModel,
        xp?: number,
        image?: string,
        actions?: ActionViewModel[],
        languages?: LanguageViewModel[],
        skills?: SkillViewModel[],
        talents?: TalentViewModel[],
        attackProperties?: AttackPropertyViewModel[],
    ) {
        this._id = id;
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

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get type(): CreatureTypeEnum {
        return this._type;
    }

    set type(value: CreatureTypeEnum) {
        this._type = value;
    }

    get armorclass(): number {
        return this._armorclass;
    }

    set armorclass(value: number) {
        this._armorclass = value;
    }

    get hitpoints(): number {
        return this._hitpoints;
    }

    set hitpoints(value: number) {
        this._hitpoints = value;
    }

    get alignment(): AlignmentEnum {
        return this._alignment;
    }

    set alignment(value: AlignmentEnum) {
        this._alignment = value;
    }

    get creatureClass(): string {
        return this._creatureClass;
    }

    set creatureClass(value: string) {
        this._creatureClass = value;
    }

    get challenge(): number {
        return this._challenge;
    }

    set challenge(value: number) {
        this._challenge = value;
    }

    get movement(): number {
        return this._movement;
    }

    set movement(value: number) {
        this._movement = value;
    }

    get ini(): number {
        return this._ini;
    }

    set ini(value: number) {
        this._ini = value;
    }

    get baseAtk(): number {
        return this._baseAtk;
    }

    set baseAtk(value: number) {
        this._baseAtk = value;
    }

    get size(): CreatureSizeEnum {
        return this._size;
    }

    set size(value: CreatureSizeEnum) {
        this._size = value;
    }

    get stats(): StatsViewModel {
        return this._stats;
    }

    set stats(value: StatsViewModel) {
        this._stats = value;
    }

    get saveThrows(): SavingThrowsViewModel {
        return this._saveThrows;
    }

    set saveThrows(value: SavingThrowsViewModel) {
        this._saveThrows = value;
    }

    get xp(): number {
        return this._xp;
    }

    set xp(value: number) {
        this._xp = value;
    }

    get image(): string {
        return this._image;
    }

    set image(value: string) {
        this._image = value;
    }

    get actions(): ActionViewModel[] {
        return this._actions;
    }

    set actions(value: ActionViewModel[]) {
        this._actions = value;
    }

    get languages(): LanguageViewModel[] {
        return this._languages;
    }

    set languages(value: LanguageViewModel[]) {
        this._languages = value;
    }

    get skills(): SkillViewModel[] {
        return this._skills;
    }

    set skills(value: SkillViewModel[]) {
        this._skills = value;
    }

    get talents(): TalentViewModel[] {
        return this._talents;
    }

    set talents(value: TalentViewModel[]) {
        this._talents = value;
    }

    get attackProperties(): AttackPropertyViewModel[] {
        return this._attackProperties;
    }

    set attackProperties(value: AttackPropertyViewModel[]) {
        this._attackProperties = value;
    }
}