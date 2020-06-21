import {TypeEnum} from "../enumeration/TypesEnum";
import {AlignmentEnum} from "../enumeration/AlignmentEnum";
import {PathfinderCreatureSizeEnum} from "../enumeration/pathfinder/PathfinderCreatureSizeEnum";
import {PathfinderStatsViewModel} from "../dataModel/pathfinder/PathfinderStatsViewModel";
import {PathfinderSavingThrowsViewModel} from "../dataModel/pathfinder/PathfinderSavingThrowsViewModel";
import {ActionViewModel} from "./ActionViewModel";
import {LanguageViewModel} from "./LanguageViewModel";
import {SkillViewModel} from "./SkillViewModel";
import {TalentViewModel} from "./TalentViewModel";
import {NamedPropertyViewModel} from "../dataModel/NamedPropertyViewModel";
import {AbstractPropertyViewModel} from "../AbstractPropertyViewModel";
import {ApplyEffects} from "@/public/model/effects/decorator/DecoratorFunctions";

export class PathfinderCreaturePropertiesViewModel extends AbstractPropertyViewModel{

    private _id: string;
    private _type: TypeEnum;
    private _armorclass: number;
    private _hitpoints: number;
    private _alignment: AlignmentEnum;
    private _creatureClass: string;
    private _challenge: number;
    private _movement: number;
    private _ini: number;
    private _baseAtk: number;
    private _size: PathfinderCreatureSizeEnum;
    private _stats: PathfinderStatsViewModel;
    private _saveThrows: PathfinderSavingThrowsViewModel;
    private _xp?: number;
    private _image?: string;
    private _actions?: ActionViewModel[];
    private _languages?: LanguageViewModel[];
    private _skills?: SkillViewModel[];
    private _talents?: TalentViewModel[];
    private _attackProperties?: NamedPropertyViewModel[];
    private _currentHitpoints: number;
    private _currentInitiative: number;
    private _currentArmorclass: number;
    private _label: number;

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
        stats: PathfinderStatsViewModel,
        saveThrows: PathfinderSavingThrowsViewModel,
        xp?: number,
        image?: string,
        actions?: ActionViewModel[],
        languages?: LanguageViewModel[],
        skills?: SkillViewModel[],
        talents?: TalentViewModel[],
        attackProperties?: NamedPropertyViewModel[],
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
        this._currentHitpoints = hitpoints;
        this._currentInitiative = ini;
        this._currentArmorclass = armorclass;
        this._label = null;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    @ApplyEffects
    get type(): TypeEnum {
        return this._type;
    }

    set type(value: TypeEnum) {
        this._type = value;
    }

    get armorclass(): number {
        return this._armorclass;
    }

    set armorclass(value: number) {
        this._armorclass = value;
    }

    @ApplyEffects
    get hitpoints(): number {
        return this._hitpoints;
    }

    set hitpoints(value: number) {
        this._hitpoints = value;
    }

    @ApplyEffects
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

    @ApplyEffects
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

    @ApplyEffects
    get size(): PathfinderCreatureSizeEnum {
        return this._size;
    }

    set size(value: PathfinderCreatureSizeEnum) {
        this._size = value;
    }

    get stats(): PathfinderStatsViewModel {
        return this._stats;
    }

    set stats(value: PathfinderStatsViewModel) {
        this._stats = value;
    }

    get saveThrows(): PathfinderSavingThrowsViewModel {
        return this._saveThrows;
    }

    set saveThrows(value: PathfinderSavingThrowsViewModel) {
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

    get attackProperties(): NamedPropertyViewModel[] {
        return this._attackProperties;
    }

    set attackProperties(value: NamedPropertyViewModel[]) {
        this._attackProperties = value;
    }

    @ApplyEffects
    get currentHitpoints(): number {
        return this._currentHitpoints;
    }

    set currentHitpoints(value: number) {
        this._currentHitpoints = value;
    }

    @ApplyEffects
    get currentInitiative(): number {
        return this._currentInitiative;
    }

    set currentInitiative(value: number) {
        this._currentInitiative = value;
    }

    @ApplyEffects
    get currentArmorclass(): number {
        return this._currentArmorclass;
    }

    set currentArmorclass(value: number) {
        this._currentArmorclass = value;
    }

    get label(): number {
        return this._label;
    }

    set label(value: number) {
        this._label = value;
    }
}