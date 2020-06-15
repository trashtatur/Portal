import {AbstractPropertyViewModel, ApplyEffects} from "../AbstractPropertyViewModel";
import {TypeEnum} from "../enumeration/TypesEnum";
import {DiceRollSpecification} from "../dataModel/DiceRollSpecification";
import {AlignmentEnum} from "../enumeration/AlignmentEnum";
import {NamedPropertyViewModel} from "../dataModel/NamedPropertyViewModel";
import {DND5CreatureTypeEnum} from "../enumeration/dnd5/DND5CreatureTypeEnum";
import {DND5CreatureStatsViewModel} from "../dataModel/dnd5/DND5CreatureStatsViewModel";
import {DND5CreatureSizeEnum} from "../enumeration/dnd5/DND5CreatureSizeEnum";
import {DND5ActionViewModel} from "./DND5ActionViewModel";
import {DND5TalentViewModel} from "./DND5TalentViewModel";
import {DND5SkillViewModel} from "./DND5SkillViewModel";
import {DND5LanguageViewModel} from "./DND5LanguageViewModel";
import {DND5SpellViewModel} from "./DND5SpellViewModel";
import {ClassAndLevelViewModel} from "../dataModel/ClassAndLevelViewModel";
import {DND5SpellSlotsViewModel} from "../dataModel/dnd5/DND5SpellSlotsViewModel";
import {SenseViewModel} from "../dataModel/dnd5/SenseViewModel";
import {DND5SavingThrowsModel} from "../../../model/dataModel/dnd5/DND5SavingThrowsModel";
import {SpeedViewModel} from "@/public/model/dataModel/SpeedViewModel";

export class DND5CreaturePropertiesViewModel extends AbstractPropertyViewModel
{
    private _id: string;
    private _type: TypeEnum;
    private _proficiencyBonus: number;
    private _armorclass: number;
    private _armorType: string;
    private _hitpoints: number;
    private _hitDice: DiceRollSpecification;
    private _alignment: AlignmentEnum;
    private _attackProperties: NamedPropertyViewModel[];
    private _creatureType: DND5CreatureTypeEnum;
    private _challenge: number;
    private _xp: number;
    private _stats: DND5CreatureStatsViewModel;
    private _size: DND5CreatureSizeEnum;
    private _speed: SpeedViewModel;
    private _spellSlots: DND5SpellSlotsViewModel;
    private _classesAndLevels?: Array<ClassAndLevelViewModel>;
    private _damageVulnerabilities?: Array<string>;
    private _damageResistances?: Array<string>;
    private _conditionImmunities?: Array<string>;
    private _damageImmunities?: Array<string>;
    private _savingThrows?: DND5SavingThrowsModel;
    private _image?: string;
    private _senses?: SenseViewModel[];
    private _legendaryActions?: NamedPropertyViewModel[];
    private _reactions?: NamedPropertyViewModel[];
    private _actions?: DND5ActionViewModel[];
    private _talents?: DND5TalentViewModel[];
    private _skills?: DND5SkillViewModel[];
    private _languages?: DND5LanguageViewModel[];
    private _spells?: DND5SpellViewModel[];

    constructor(
        id: string,
        type: TypeEnum,
        proficiencyBonus: number,
        armorclass: number,
        armorType: string,
        hitpoints: number,
        hitDice: DiceRollSpecification,
        alignment: AlignmentEnum,
        attackProperties: NamedPropertyViewModel[],
        creatureType: DND5CreatureTypeEnum,
        challenge: number,
        xp: number,
        stats: DND5CreatureStatsViewModel,
        size: DND5CreatureSizeEnum,
        speed: SpeedViewModel,
        spellSlots: DND5SpellSlotsViewModel,
        classesAndLevels?: Array<ClassAndLevelViewModel>,
        damageVulnerabilities?: Array<string>,
        damageResistances?: Array<string>,
        conditionImmunities?: Array<string>,
        damageImmunities?: Array<string>,
        savingThrows?: DND5SavingThrowsModel,
        image?: string,
        senses?: SenseViewModel[],
        legendaryActions?: NamedPropertyViewModel[],
        reactions?: NamedPropertyViewModel[],
        actions?: DND5ActionViewModel[],
        talents?: DND5TalentViewModel[],
        skills?: DND5SkillViewModel[],
        languages?: DND5LanguageViewModel[],
        spells?: DND5SpellViewModel[],
    ) {
        super();
        this._id = id;
        this._type = type;
        this._proficiencyBonus = proficiencyBonus;
        this._armorclass = armorclass;
        this._armorType = armorType;
        this._hitpoints = hitpoints;
        this._hitDice = hitDice;
        this._alignment = alignment;
        this._attackProperties = attackProperties;
        this._creatureType = creatureType;
        this._challenge = challenge;
        this._xp = xp;
        this._stats = stats;
        this._size = size;
        this._speed = speed;
        this._spellSlots = spellSlots;
        this._classesAndLevels = classesAndLevels;
        this._damageVulnerabilities = damageVulnerabilities;
        this._damageResistances = damageResistances;
        this._conditionImmunities = conditionImmunities;
        this._damageImmunities = damageImmunities;
        this._savingThrows = savingThrows;
        this._image = image;
        this._senses = senses;
        this._legendaryActions = legendaryActions;
        this._reactions = reactions;
        this._actions = actions;
        this._talents = talents;
        this._skills = skills;
        this._languages = languages;
        this._spells = spells;
    }

    get id(): string {
        if (this._id === null) return '';
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    @ApplyEffects
    get type(): TypeEnum {
        if (this._type === null) return TypeEnum.NONE
        return this._type;
    }

    set type(value: TypeEnum) {
        this._type = value;
    }

    @ApplyEffects
    get proficiencyBonus(): number {
        return this._proficiencyBonus;
    }

    set proficiencyBonus(value: number) {
        this._proficiencyBonus = value;
    }

    @ApplyEffects
    get armorclass(): number {
        return this._armorclass;
    }

    set armorclass(value: number) {
        this._armorclass = value;
    }

    get armorType(): string {
        return this._armorType;
    }

    set armorType(value: string) {
        this._armorType = value;
    }

    @ApplyEffects
    get hitpoints(): number {
        return this._hitpoints;
    }

    set hitpoints(value: number) {
        this._hitpoints = value;
    }

    get hitDice(): DiceRollSpecification {
        return this._hitDice;
    }

    set hitDice(value: DiceRollSpecification) {
        this._hitDice = value;
    }

    get alignment(): AlignmentEnum {
        return this._alignment;
    }

    set alignment(value: AlignmentEnum) {
        this._alignment = value;
    }

    get attackProperties(): NamedPropertyViewModel[] {
        return this._attackProperties;
    }

    set attackProperties(value: NamedPropertyViewModel[]) {
        this._attackProperties = value;
    }

    get creatureType(): DND5CreatureTypeEnum {
        return this._creatureType;
    }

    set creatureType(value: DND5CreatureTypeEnum) {
        this._creatureType = value;
    }

    @ApplyEffects
    get challenge(): number {
        return this._challenge;
    }

    set challenge(value: number) {
        this._challenge = value;
    }

    get xp(): number {
        return this._xp;
    }

    set xp(value: number) {
        this._xp = value;
    }

    get stats(): DND5CreatureStatsViewModel {
        return this._stats;
    }

    set stats(value: DND5CreatureStatsViewModel) {
        this._stats = value;
    }

    get size(): DND5CreatureSizeEnum {
        return this._size;
    }

    set size(value: DND5CreatureSizeEnum) {
        this._size = value;
    }

    get speed(): SpeedViewModel {
        return this._speed;
    }

    set speed(value: SpeedViewModel) {
        this._speed = value;
    }

    get spellSlots(): DND5SpellSlotsViewModel {
        return this._spellSlots;
    }

    set spellSlots(value: DND5SpellSlotsViewModel) {
        this._spellSlots = value;
    }

    get classesAndLevels(): Array<ClassAndLevelViewModel> {
        return this._classesAndLevels;
    }

    set classesAndLevels(value: Array<ClassAndLevelViewModel>) {
        this._classesAndLevels = value;
    }

    get damageVulnerabilities(): Array<string> {
        return this._damageVulnerabilities;
    }

    set damageVulnerabilities(value: Array<string>) {
        this._damageVulnerabilities = value;
    }

    get damageResistances(): Array<string> {
        return this._damageResistances;
    }

    set damageResistances(value: Array<string>) {
        this._damageResistances = value;
    }

    get conditionImmunities(): Array<string> {
        return this._conditionImmunities;
    }

    set conditionImmunities(value: Array<string>) {
        this._conditionImmunities = value;
    }

    get damageImmunities(): Array<string> {
        return this._damageImmunities;
    }

    set damageImmunities(value: Array<string>) {
        this._damageImmunities = value;
    }

    get savingThrows(): DND5SavingThrowsModel {
        return this._savingThrows;
    }

    set savingThrows(value: DND5SavingThrowsModel) {
        this._savingThrows = value;
    }

    get image(): string {
        return this._image;
    }

    set image(value: string) {
        this._image = value;
    }

    get senses(): SenseViewModel[] {
        return this._senses;
    }

    set senses(value: SenseViewModel[]) {
        this._senses = value;
    }

    get legendaryActions(): NamedPropertyViewModel[] {
        return this._legendaryActions;
    }

    set legendaryActions(value: NamedPropertyViewModel[]) {
        this._legendaryActions = value;
    }

    get reactions(): NamedPropertyViewModel[] {
        return this._reactions;
    }

    set reactions(value: NamedPropertyViewModel[]) {
        this._reactions = value;
    }

    get actions(): DND5ActionViewModel[] {
        return this._actions;
    }

    set actions(value: DND5ActionViewModel[]) {
        this._actions = value;
    }

    get talents(): DND5TalentViewModel[] {
        return this._talents;
    }

    set talents(value: DND5TalentViewModel[]) {
        this._talents = value;
    }

    get skills(): DND5SkillViewModel[] {
        return this._skills;
    }

    set skills(value: DND5SkillViewModel[]) {
        this._skills = value;
    }

    get languages(): DND5LanguageViewModel[] {
        return this._languages;
    }

    set languages(value: DND5LanguageViewModel[]) {
        this._languages = value;
    }

    get spells(): DND5SpellViewModel[] {
        return this._spells;
    }

    set spells(value: DND5SpellViewModel[]) {
        this._spells = value;
    }

    getPrimitiveAttributeAsString(attribute?: string | number): string {
        if (attribute === null) return '';
        return `${attribute}`;
    }
}