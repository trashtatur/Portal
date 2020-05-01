import {AbstractCreaturePropertyModel} from "../AbstractCreaturePropertyModel";
import {DND5ActionModel} from "./DND5ActionModel";
import {DND5TalentModel} from "./DND5TalentModel";
import {DND5SkillModel} from "./DND5SkillModel";
import {DND5LanguageModel} from "./DND5LanguageModel";
import {DiceRollSpecification} from "../dataModel/DiceRollSpecification";
import {AlignmentEnum} from "../enumeration/AlignmentEnum";
import {NamedCreatureProperty} from "../dataModel/NamedCreatureProperty";
import {CreatureSizeEnum} from "../enumeration/CreatureSizeEnum";
import {TypeEnum} from "../enumeration/TypeEnum";
import {CreatureTypeEnum} from "../enumeration/dnd5/CreatureTypeEnum";
import {CreatureStatsModel} from "../dataModel/CreatureStatsModel";
import {SenseModel} from "../dataModel/dnd5/SenseModel";
import {DND5SavingThrowsModel} from "../dataModel/dnd5/DND5SavingThrowsModel";
import {ClassAndLevelModel} from "../dataModel/ClassAndLevelModel";
import {DND5SpellModel} from "./DND5SpellModel";

export class DND5CreaturePropertiesModel extends AbstractCreaturePropertyModel {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _type: TypeEnum;
    private readonly _armorclass: number;
    private readonly _armorType: string;
    private readonly _hitpoints: number;
    private readonly _hitDice: DiceRollSpecification;
    private readonly _alignment: AlignmentEnum;
    private readonly _attackProperties: NamedCreatureProperty[];
    private readonly _creatureType: CreatureTypeEnum;
    private readonly _challenge: number;
    private readonly _xp: number;
    private readonly _stats: CreatureStatsModel;
    private readonly _size: CreatureSizeEnum;
    private readonly _speed: string;
    private readonly _classesAndLevels?: Array<ClassAndLevelModel>;
    private readonly _damageVulnerabilities?: Array<string>;
    private readonly _damageResistances?: Array<string>;
    private readonly _conditionImmunities?: Array<string>;
    private readonly _damageImmunities?: Array<string>;
    private readonly _savingThrows?: DND5SavingThrowsModel;
    private readonly _image?: string;
    private readonly _senses?: SenseModel[];
    private readonly _legendaryActions?: NamedCreatureProperty[];
    private readonly _reactions?: NamedCreatureProperty[];
    private readonly _actions?: DND5ActionModel[];
    private readonly _talents?: DND5TalentModel[];
    private readonly _skills?: DND5SkillModel[];
    private readonly _languages?: DND5LanguageModel[];
    private readonly _spells?: DND5SpellModel[];


    constructor(
        id: string,
        name: string,
        type: TypeEnum,
        armorclass: number,
        armorType: string,
        hitpoints: number,
        hitDice: DiceRollSpecification,
        alignment: AlignmentEnum,
        attackProperties: NamedCreatureProperty[],
        creatureType: CreatureTypeEnum,
        challenge: number,
        xp: number,
        stats: CreatureStatsModel,
        size: CreatureSizeEnum,
        speed: string,
        classesAndLevels?: Array<ClassAndLevelModel>,
        damageVulnerabilities?: Array<string>,
        damageResistances?: Array<string>,
        conditionImmunities?: Array<string>,
        damageImmunities?: Array<string>,
        savingThrows?: DND5SavingThrowsModel,
        image?: string,
        senses?: SenseModel[],
        legendaryActions?: NamedCreatureProperty[],
        reactions?: NamedCreatureProperty[],
        actions?: DND5ActionModel[],
        talents?: DND5TalentModel[],
        skills?: DND5SkillModel[],
        languages?: DND5LanguageModel[],
        spells?: DND5SpellModel[]
    ) {
        super();
        this._spells = spells;
        this._name = name;
        this._type = type;
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
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get type(): TypeEnum {
        return this._type;
    }

    get armorclass(): number {
        return this._armorclass;
    }

    get armorType(): string {
        return this._armorType;
    }

    get hitpoints(): number {
        return this._hitpoints;
    }

    get hitDice(): DiceRollSpecification {
        return this._hitDice;
    }

    get alignment(): AlignmentEnum {
        return this._alignment;
    }

    get attackProperties(): NamedCreatureProperty[] {
        return this._attackProperties;
    }

    get creatureType(): CreatureTypeEnum {
        return this._creatureType;
    }

    get challenge(): number {
        return this._challenge;
    }

    get xp(): number {
        return this._xp;
    }

    get stats(): CreatureStatsModel {
        return this._stats;
    }

    get size(): CreatureSizeEnum {
        return this._size;
    }

    get speed(): string {
        return this._speed;
    }

    get classesAndLevels(): Array<ClassAndLevelModel> {
        return this._classesAndLevels;
    }

    get damageVulnerabilities(): Array<string> {
        return this._damageVulnerabilities;
    }

    get damageResistances(): Array<string> {
        return this._damageResistances;
    }

    get conditionImmunities(): Array<string> {
        return this._conditionImmunities;
    }

    get damageImmunities(): Array<string> {
        return this._damageImmunities;
    }

    get savingThrows(): DND5SavingThrowsModel {
        return this._savingThrows;
    }

    get image(): string {
        return this._image;
    }

    get senses(): SenseModel[] {
        return this._senses;
    }

    get legendaryActions(): NamedCreatureProperty[] {
        return this._legendaryActions;
    }

    get reactions(): NamedCreatureProperty[] {
        return this._reactions;
    }

    get actions(): DND5ActionModel[] {
        return this._actions;
    }

    get talents(): DND5TalentModel[] {
        return this._talents;
    }

    get skills(): DND5SkillModel[] {
        return this._skills;
    }

    get languages(): DND5LanguageModel[] {
        return this._languages;
    }

    get spells(): DND5SpellModel[] {
        return this._spells;
    }
}