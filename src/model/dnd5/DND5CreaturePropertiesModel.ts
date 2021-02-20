import {AbstractCreaturePropertyModel} from "../AbstractCreaturePropertyModel";
import {DND5ActionModel} from "./DND5ActionModel";
import {DND5TalentModel} from "./DND5TalentModel";
import {DND5SkillModel} from "./DND5SkillModel";
import {DND5LanguageModel} from "./DND5LanguageModel";
import {DiceRollSpecification} from "../DiceRollSpecification";
import {AlignmentEnum} from "../enumeration/AlignmentEnum";
import {NamedCreatureProperty} from "../NamedCreatureProperty";
import {DND5CreatureSizeEnum} from "../enumeration/dnd5/DND5CreatureSizeEnum";
import {TypeEnum} from "../enumeration/TypeEnum";
import {CreatureTypeEnum} from "../enumeration/dnd5/CreatureTypeEnum";
import {CreatureStatsModel} from "../CreatureStatsModel";
import {SenseModel} from "./SenseModel";
import {DND5SavingThrowsModel} from "./DND5SavingThrowsModel";
import {ClassAndLevelModel} from "../ClassAndLevelModel";
import {DND5SpellModel} from "./DND5SpellModel";
import {DND5SpellSlotsModel} from "./DND5SpellSlotsModel";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class DND5CreaturePropertiesModel extends AbstractCreaturePropertyModel {
    @JsonProperty({name: 'id'})
    private readonly _id: string;
    @JsonProperty({name: 'type'})
    private readonly _type: TypeEnum;
    @JsonProperty({name: 'proficiencyBonus'})
    private readonly _proficiencyBonus: number;
    @JsonProperty({name: 'armorclass'})
    private readonly _armorclass: number;
    @JsonProperty({name: 'hitpoints'})
    private readonly _hitpoints: number;
    @JsonProperty({name: 'hitDice'})
    private readonly _hitDice: DiceRollSpecification;
    @JsonProperty({name: 'alignment'})
    private readonly _alignment: AlignmentEnum;
    @JsonProperty({name: 'attackProperties'})
    private readonly _attackProperties: NamedCreatureProperty[];
    @JsonProperty({name: 'creatureType'})
    private readonly _creatureType: CreatureTypeEnum;
    @JsonProperty({name: 'challenge'})
    private readonly _challenge: number;
    @JsonProperty({name: 'xp'})
    private readonly _xp: number;
    @JsonProperty({name: 'stats'})
    private readonly _stats: CreatureStatsModel;
    @JsonProperty({name: 'size'})
    private readonly _size: DND5CreatureSizeEnum;
    @JsonProperty({name: 'speed'})
    private readonly _speed: string;
    @JsonProperty({name: 'spellSlots'})
    private readonly _spellSlots: DND5SpellSlotsModel;
    @JsonProperty({name: 'classesAndLevels'})
    private readonly _classesAndLevels?: Array<ClassAndLevelModel>;
    @JsonProperty({name: 'damageVulnerabilities'})
    private readonly _damageVulnerabilities?: Array<string>;
    @JsonProperty({name: 'damageResistances'})
    private readonly _damageResistances?: Array<string>;
    @JsonProperty({name: 'conditionImmunities'})
    private readonly _conditionImmunities?: Array<string>;
    @JsonProperty({name: 'damageImmunities'})
    private readonly _damageImmunities?: Array<string>;
    @JsonProperty({name: 'savingThrows'})
    private readonly _savingThrows?: DND5SavingThrowsModel;
    @JsonProperty({name: 'image'})
    private readonly _image?: string;
    @JsonProperty({name: 'senses'})
    private readonly _senses?: SenseModel[];
    @JsonProperty({name: 'legendaryActions'})
    private readonly _legendaryActions?: NamedCreatureProperty[];
    @JsonProperty({name: 'reactions'})
    private readonly _reactions?: NamedCreatureProperty[];
    @JsonProperty({name: 'actions'})
    private readonly _actions?: DND5ActionModel[];
    @JsonProperty({name: 'talents'})
    private readonly _talents?: DND5TalentModel[];
    @JsonProperty({name: 'skills'})
    private readonly _skills?: DND5SkillModel[];
    @JsonProperty({name: 'languages'})
    private readonly _languages?: DND5LanguageModel[];
    @JsonProperty({name: 'spells'})
    private readonly _spells?: DND5SpellModel[];

    constructor(
        id: string,
        type: TypeEnum,
        proficiencyBonus: number,
        armorclass: number,
        hitpoints: number,
        hitDice: DiceRollSpecification,
        alignment: AlignmentEnum,
        attackProperties: NamedCreatureProperty[],
        creatureType: CreatureTypeEnum,
        challenge: number,
        xp: number,
        stats: CreatureStatsModel,
        size: DND5CreatureSizeEnum,
        speed: string,
        spellSlots: DND5SpellSlotsModel,
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
        this._type = type;
        this._proficiencyBonus = proficiencyBonus;
        this._armorclass = armorclass;
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
    }

    get id(): string {
        return this._id;
    }

    get type(): TypeEnum {
        return this._type;
    }

    get proficiencyBonus(): number {
        return this._proficiencyBonus;
    }

    get armorclass(): number {
        return this._armorclass;
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

    get size(): DND5CreatureSizeEnum {
        return this._size;
    }

    get speed(): string {
        return this._speed;
    }

    get spellSlots(): DND5SpellSlotsModel {
        return this._spellSlots;
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