import {EntityToModelMapperInterface} from "../EntityToModelMapperInterface";
import {CreatureModel} from "../../model/CreatureModel";
import {Creature} from "../../db/schemas/Creature";
import {Service} from "@tsed/di";
import {ActionEntityToModelMapper} from "./ActionEntityToModelMapper";
import {TalentEntityToModelMapper} from "./TalentEntityToModelMapper";
import {SkillEntityToModelMapper} from "./SkillEntityToModelMapper";
import {LanguageEntityToModelMapper} from "./LanguageEntityToModelMapper";
import {LanguageModel} from "../../model/LanguageModel";
import {TalentModel} from "../../model/TalentModel";
import {SkillModel} from "../../model/SkillModel";
import {ActionModel} from "../../model/ActionModel";
import {CreatureTypeEnum} from "../../model/enumeration/CreatureTypeEnum";
import {Alignment} from "../../model/dataModel/Alignment";
import {CreatureSize} from "../../model/dataModel/CreatureSize";
import {CreatureStats} from "../../model/dataModel/CreatureStats";
import {SavingThrows} from "../../model/dataModel/SavingThrows";
import {AttackProperty} from "../../model/dataModel/AttackProperty";
import {attackProperty, pathFinderSaveThrows, stats} from "../../types/backendTypes";

@Service()
export class CreatureEntityToModelMapper implements EntityToModelMapperInterface {
    private actionEntityToModelMapper: ActionEntityToModelMapper;
    private talentEntityToModelMapper: TalentEntityToModelMapper;
    private skillEntityToModelMapper: SkillEntityToModelMapper;
    private languageEntityToModelMapper: LanguageEntityToModelMapper;

    constructor(
        actionEntityToModelMapper: ActionEntityToModelMapper,
        talentEntityToModelMapper: TalentEntityToModelMapper,
        skillEntityToModelMapper: SkillEntityToModelMapper,
        languageEntityToModelMapper: LanguageEntityToModelMapper
    ) {
        this.actionEntityToModelMapper = actionEntityToModelMapper;
        this.talentEntityToModelMapper = talentEntityToModelMapper;
        this.skillEntityToModelMapper = skillEntityToModelMapper;
        this.languageEntityToModelMapper = languageEntityToModelMapper;
    }

    map(entity: Creature): CreatureModel {
        const languageModels = this.mapLanguages(entity);
        const talentModels = this.mapTalents(entity);
        const skillModels = this.mapSkills(entity);
        const actionModels = this.mapActions(entity);

        return new CreatureModel(
            entity.name,
            CreatureTypeEnum[entity.type],
            entity.armorclass,
            entity.hitpoints,
            Alignment[entity.alignment],
            entity.creatureClass,
            entity.challenge,
            entity.movement,
            entity.ini,
            entity.baseAtk,
            CreatureSize[entity.size],
            this.mapStatsStringToStatsDataModel(entity.stats),
            this.mapSaveThrowsStringToSaveThrowsDataModel(entity.saveThrows),
            entity.xp,
            entity.image,
            actionModels,
            languageModels,
            skillModels,
            talentModels,
            this.mapAttackPropertiesStringToAttackPropertiesDataModel(entity.attackProperties)
        )
    }

    private mapLanguages = (entity: Creature): Array<LanguageModel> | null => {
        if (entity.languages) {
            return entity.languages.map(languageEntity => {
                return this.languageEntityToModelMapper.map(languageEntity);
            });
        }
        return null;
    }

    private mapTalents = (entity: Creature): Array<TalentModel> | null => {
        if (entity.talents) {
            return entity.talents.map(talentEntity => {
                return this.talentEntityToModelMapper.map(talentEntity);
            });
        }
        return null;
    }

    private mapSkills = (entity: Creature): Array<SkillModel> | null => {
        if (entity.skills) {
            return entity.skills.map(skillEntity => {
              return this.skillEntityToModelMapper.map(skillEntity);
            });
        }
        return null;
    }

    private mapActions = (entity: Creature): Array<ActionModel> | null => {
        if (entity.actions) {
            return entity.actions.map(actionEntity => {
                return this.actionEntityToModelMapper.map(actionEntity);
            })
        }
    }

    private mapStatsStringToStatsDataModel = (statsString: string): CreatureStats => {
        try {
            const statsData: stats = JSON.parse(statsString);
            return new CreatureStats(
                statsData.str,
                statsData.dex,
                statsData.con,
                statsData.int,
                statsData.wis,
                statsData.cha
            )
        } catch (e) {

        }
    }

    private mapSaveThrowsStringToSaveThrowsDataModel = (saveThrowsString: string): SavingThrows | null => {
        try {
            const saveThrowsData:pathFinderSaveThrows = JSON.parse(saveThrowsString);
            return new SavingThrows(saveThrowsData.ref, saveThrowsData.will, saveThrowsData.fort)
        } catch (e) {

        }
    }

    private mapAttackPropertiesStringToAttackPropertiesDataModel =
        (attackPropertiesString: string): AttackProperty[] | null => {
        try {
            const attackPropertiesData: attackProperty[] = JSON.parse(attackPropertiesString)
            return attackPropertiesData.map(data => {
                return new AttackProperty(data.name, data.property)
            });
        } catch (e) {

        }
    }
}