import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {DND5CreatureProperties} from "../../../db/schemas/DND5/DND5CreatureProperties";
import {DND5CreaturePropertiesModel} from "../../../model/dnd5/DND5CreaturePropertiesModel";
import {
    getEnumKeyForValue,
    mapDamageStringToDamageDataModel,
    mapNamedPropertiesStringToNamedPropertiesModel,
    mapStatsStringToStatsDataModel
} from "../../../helper/HelperFunctions";
import {TypeEnum} from "../../../model/enumeration/TypeEnum";
import {AlignmentEnum} from "../../../model/enumeration/AlignmentEnum";
import {CreatureTypeEnum} from "../../../model/enumeration/dnd5/CreatureTypeEnum";
import {DND5CreatureSizeEnum} from "../../../model/enumeration/dnd5/DND5CreatureSizeEnum";
import {DND5ActionEntityToModelMapper} from "./DND5ActionEntityToModelMapper";
import {DND5LanguageEntityToModelMapper} from "./DND5LanguageEntityToModelMapper";
import {DND5TalentEntityToModelMapper} from "./DND5TalentEntityToModelMapper";
import {DND5SkillEntityToModelMapper} from "./DND5SkillEntityToModelMapper";
import {DND5SpellEntityToModelMapper} from "./DND5SpellEntityToModelMapper";
import {Service} from "@tsed/di";
import {DND5SavingThrowsModel} from "../../../model/dnd5/DND5SavingThrowsModel";
import {SenseModel} from "../../../model/dnd5/SenseModel";
import {DND5SpellSlotsModel} from "../../../model/dnd5/DND5SpellSlotsModel";
import {dnd5SavingThrows, dnd5Sense, dnd5SpellSlots} from "../../../types/dnd5BackendTypes";

@Service()
export class DND5CreaturePropertiesEntityToModelMapper implements EntityToModelMapperInterface<DND5CreatureProperties, DND5CreaturePropertiesModel> {
    private dnd5ActionEntityToModelMapper: DND5ActionEntityToModelMapper;
    private dnd5LanguageEntityToModelMapper: DND5LanguageEntityToModelMapper;
    private dnd5TalentEntityToModelMapper: DND5TalentEntityToModelMapper;
    private dnd5SkillEntityToModelMapper: DND5SkillEntityToModelMapper;
    private dnd5SpellEntityToModelMapper: DND5SpellEntityToModelMapper;

    constructor(
        dnd5ActionEntityToModelMapper: DND5ActionEntityToModelMapper,
        dnd5LanguageEntityToModelMapper: DND5LanguageEntityToModelMapper,
        dnd5TalentEntityToModelMapper: DND5TalentEntityToModelMapper,
        dnd5SkillEntityToModelMapper: DND5SkillEntityToModelMapper,
        dnd5SpellEntityToModelMapper: DND5SpellEntityToModelMapper
    ) {
        this.dnd5ActionEntityToModelMapper = dnd5ActionEntityToModelMapper;
        this.dnd5LanguageEntityToModelMapper = dnd5LanguageEntityToModelMapper;
        this.dnd5TalentEntityToModelMapper = dnd5TalentEntityToModelMapper;
        this.dnd5SkillEntityToModelMapper = dnd5SkillEntityToModelMapper;
        this.dnd5SpellEntityToModelMapper = dnd5SpellEntityToModelMapper;
    }

    map = (entity: DND5CreatureProperties): DND5CreaturePropertiesModel => {
        return new DND5CreaturePropertiesModel(
            entity.uuid,
            getEnumKeyForValue(entity.type, TypeEnum),
            entity.proficiencyBonus,
            entity.armorclass,
            entity.hitpoints,
            mapDamageStringToDamageDataModel(entity.hitDice),
            getEnumKeyForValue(entity.alignment, AlignmentEnum),
            entity.attackProperties,
            getEnumKeyForValue(entity.creatureType, CreatureTypeEnum),
            entity.challenge,
            entity.xp,
            mapStatsStringToStatsDataModel(entity.stats),
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
            mapNamedPropertiesStringToNamedPropertiesModel(entity.legendaryActions),
            mapNamedPropertiesStringToNamedPropertiesModel(entity.reactions),
            this.dnd5ActionEntityToModelMapper.mapMultiple(entity.actions),
            this.dnd5TalentEntityToModelMapper.mapMultiple(entity.talents),
            this.dnd5SkillEntityToModelMapper.mapMultiple(entity.skills),
            this.dnd5LanguageEntityToModelMapper.mapMultiple(entity.languages),
            this.dnd5SpellEntityToModelMapper.mapMultiple(entity.spells)
        )
    }

    mapMultiple = (entities?: DND5CreatureProperties[]): DND5CreaturePropertiesModel[] => {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.map(entity);
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