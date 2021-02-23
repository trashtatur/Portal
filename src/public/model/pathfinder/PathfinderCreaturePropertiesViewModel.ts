import {TypeEnum} from "../enumeration/TypesEnum";
import {AlignmentEnum} from "../enumeration/AlignmentEnum";
import {PathfinderCreatureSizeEnum} from "../enumeration/pathfinder/PathfinderCreatureSizeEnum";
import {PathfinderStatsViewModel} from "./PathfinderStatsViewModel";
import {PathfinderSavingThrowsViewModel} from "./PathfinderSavingThrowsViewModel";
import {PathfinderActionViewModel} from "./PathfinderActionViewModel";
import {PathfinderLanguageViewModel} from "./PathfinderLanguageViewModel";
import {PathfinderSkillViewModel} from "./PathfinderSkillViewModel";
import {PathfinderTalentViewModel} from "./PathfinderTalentViewModel";
import {NamedPropertyViewModel} from "../NamedPropertyViewModel";
import {AbstractPropertyViewModel} from "../AbstractPropertyViewModel";
import {ApplyEffects} from "@/public/model/status/decorator/DecoratorFunctions";
import {JsonProperty, Serializable} from "typescript-json-serializer";
import {getEnumKeyForValue} from "@/public/service/enumFromString.service";

@Serializable()
export class PathfinderCreaturePropertiesViewModel extends AbstractPropertyViewModel{
    @JsonProperty({name: 'id'})
    private _id: string;
    @JsonProperty({name: 'type', onDeserialize: (data) => getEnumKeyForValue(data, TypeEnum)})
    private _type: TypeEnum;
    @JsonProperty({name: 'armorclass'})
    private _armorclass: number;
    @JsonProperty({name: 'hitpoints'})
    private _hitpoints: number;
    @JsonProperty({name: 'alignment', onDeserialize: (data) => getEnumKeyForValue(data, AlignmentEnum)})
    private _alignment: AlignmentEnum;
    @JsonProperty({name: 'creatureClass'})
    private _creatureClass: string;
    @JsonProperty({name: 'challenge'})
    private _challenge: number;
    @JsonProperty({name: 'movement'})
    private _movement: number;
    @JsonProperty({name: 'ini'})
    private _ini: number;
    @JsonProperty({name: 'baseAtk'})
    private _baseAtk: number;
    @JsonProperty({name: 'size', onDeserialize: (data) => getEnumKeyForValue(data, PathfinderCreatureSizeEnum)})
    private _size: PathfinderCreatureSizeEnum;
    @JsonProperty({name: 'stats'})
    private _stats: PathfinderStatsViewModel;
    @JsonProperty({name: 'saveThrows'})
    private _saveThrows: PathfinderSavingThrowsViewModel;
    @JsonProperty({name: 'xp'})
    private _xp?: number;
    @JsonProperty({name: 'image'})
    private _image?: string;
    @JsonProperty({name: 'actions', type: PathfinderActionViewModel})
    private _actions?: PathfinderActionViewModel[];
    @JsonProperty({name: 'languages', type: PathfinderLanguageViewModel})
    private _languages?: PathfinderLanguageViewModel[];
    @JsonProperty({name: 'skills', type: PathfinderSkillViewModel})
    private _skills?: PathfinderSkillViewModel[];
    @JsonProperty({name: 'talents', type: PathfinderTalentViewModel})
    private _talents?: PathfinderTalentViewModel[];
    @JsonProperty({name: 'attackProperties', type: NamedPropertyViewModel})
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
        actions?: PathfinderActionViewModel[],
        languages?: PathfinderLanguageViewModel[],
        skills?: PathfinderSkillViewModel[],
        talents?: PathfinderTalentViewModel[],
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

    get actions(): PathfinderActionViewModel[] {
        return this._actions;
    }

    set actions(value: PathfinderActionViewModel[]) {
        this._actions = value;
    }

    get languages(): PathfinderLanguageViewModel[] {
        return this._languages;
    }

    set languages(value: PathfinderLanguageViewModel[]) {
        this._languages = value;
    }

    get skills(): PathfinderSkillViewModel[] {
        return this._skills;
    }

    set skills(value: PathfinderSkillViewModel[]) {
        this._skills = value;
    }

    get talents(): PathfinderTalentViewModel[] {
        return this._talents;
    }

    set talents(value: PathfinderTalentViewModel[]) {
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