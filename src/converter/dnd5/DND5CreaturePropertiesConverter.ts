import {ConverterInterface} from "../ConverterInterface";
import {DND5CreatureProperties} from "../../db/schemas/DND5/DND5CreatureProperties";
import {DND5CreaturePropertiesModel} from "../../model/dnd5/DND5CreaturePropertiesModel";
import {TypeEnum} from "../../model/enumeration/TypeEnum";
import {AlignmentEnum} from "../../model/enumeration/AlignmentEnum";
import {CreatureTypeEnum} from "../../model/enumeration/dnd5/CreatureTypeEnum";
import {DND5CreatureSizeEnum} from "../../model/enumeration/dnd5/DND5CreatureSizeEnum";
import {DND5ActionConverter} from "./DND5ActionConverter";
import {DND5LanguageConverter} from "./DND5LanguageConverter";
import {DND5TalentConverter} from "./DND5TalentConverter";
import {DND5SkillConverter} from "./DND5SkillConverter";
import {DND5SpellConverter} from "./DND5SpellConverter";
import {Service} from "@tsed/di";
import {DND5SavingThrowsModel} from "../../model/dnd5/DND5SavingThrowsModel";
import {SenseModel} from "../../model/dnd5/SenseModel";
import {DND5SpellSlotsModel} from "../../model/dnd5/DND5SpellSlotsModel";
import {dnd5SavingThrows, dnd5Sense, dnd5SpellSlots} from "../../types/dnd5BackendTypes";
import {getEnumKeyForValue} from "../../services/EnumKeyFromStringService";
import {convertDamageString} from "../DamageStringConverter";
import {convertStatsString} from "../StatsStringConverter";
import {convertNamedPropertiesString} from "../NamedPropertiesStringConverter";

@Service()
export class DND5CreaturePropertiesConverter implements ConverterInterface<DND5CreatureProperties, DND5CreaturePropertiesModel> {
    private dnd5ActionConverter: DND5ActionConverter;
    private dnd5LanguageConverter: DND5LanguageConverter;
    private dnd5TalentConverter: DND5TalentConverter;
    private dnd5SkillConverter: DND5SkillConverter;
    private dnd5SpellConverter: DND5SpellConverter;

    constructor(
        dnd5ActionConverter: DND5ActionConverter,
        dnd5LanguageConverter: DND5LanguageConverter,
        dnd5TalentConverter: DND5TalentConverter,
        dnd5SkillConverter: DND5SkillConverter,
        dnd5SpellConverter: DND5SpellConverter
    ) {
        this.dnd5ActionConverter = dnd5ActionConverter;
        this.dnd5LanguageConverter = dnd5LanguageConverter;
        this.dnd5TalentConverter = dnd5TalentConverter;
        this.dnd5SkillConverter = dnd5SkillConverter;
        this.dnd5SpellConverter = dnd5SpellConverter;
    }

    convertEntity = (entity: DND5CreatureProperties): DND5CreaturePropertiesModel => {
        return new DND5CreaturePropertiesModel(
            entity.uuid,
            getEnumKeyForValue(entity.type, TypeEnum),
            entity.proficiencyBonus,
            entity.armorclass,
            entity.hitpoints,
            convertDamageString(entity.hitDice),
            getEnumKeyForValue(entity.alignment, AlignmentEnum),
            entity.attackProperties,
            getEnumKeyForValue(entity.creatureType, CreatureTypeEnum),
            entity.challenge,
            entity.xp,
            convertStatsString(entity.stats),
            getEnumKeyForValue(entity.size, DND5CreatureSizeEnum),
            entity.speed,
            this.mapSpellSlotStringToSpellSlotsModel(entity.spellSlots),
            entity.classesAndLevels,
            entity.damageVulnerabilities.split(','),
            entity.damageResistances.split(','),
            entity.conditionImmunities.split(','),
            entity.damageImmunities.split(','),
            this.mapSavingThrowsStringToSavingThrowsModel(entity.savingThrows),
            entity.image,
            this.mapSensesStringTosSensesModel(entity.senses),
            convertNamedPropertiesString(entity.legendaryActions),
            convertNamedPropertiesString(entity.reactions),
            this.dnd5ActionConverter.convertMultipleEntities(entity.actions),
            this.dnd5TalentConverter.convertMultipleEntities(entity.talents),
            this.dnd5SkillConverter.convertMultipleEntities(entity.skills),
            this.dnd5LanguageConverter.convertMultipleEntities(entity.languages),
            this.dnd5SpellConverter.convertMultipleEntities(entity.spells)
        )
    }

    convertMultipleEntities = (entities?: DND5CreatureProperties[]): DND5CreaturePropertiesModel[] => {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.convertEntity(entity);
        });
    }

    private mapSavingThrowsStringToSavingThrowsModel = (savingThrowsString: string): DND5SavingThrowsModel => {
        const saveThrowsData: dnd5SavingThrows = JSON.parse(savingThrowsString);
        return new DND5SavingThrowsModel(
            saveThrowsData.str,
            saveThrowsData.dex,
            saveThrowsData.con,
            saveThrowsData.int,
            saveThrowsData.wis,
            saveThrowsData.cha
        )
    }

    private mapSensesStringTosSensesModel = (sensesString: string): SenseModel[] => {
        const senseData: dnd5Sense[] = JSON.parse(sensesString);
        return senseData.map(sense => {
            return new SenseModel(sense.name, sense.value)
        })
    }

    private mapSpellSlotStringToSpellSlotsModel = (spellSlotsString: string): DND5SpellSlotsModel => {
        const spellSlotsData: dnd5SpellSlots = JSON.parse(spellSlotsString);
        return new DND5SpellSlotsModel(
            spellSlotsData["1"],
            spellSlotsData["2"],
            spellSlotsData["3"],
            spellSlotsData["4"],
            spellSlotsData["5"],
            spellSlotsData["6"],
            spellSlotsData["7"],
            spellSlotsData["8"],
            spellSlotsData["9"],
            spellSlotsData["0"]
        )
    }
}