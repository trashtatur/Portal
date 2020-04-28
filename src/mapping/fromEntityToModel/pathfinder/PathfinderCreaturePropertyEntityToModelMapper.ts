import {ActionEntityToModelMapper} from "./ActionEntityToModelMapper";
import {TalentEntityToModelMapper} from "./TalentEntityToModelMapper";
import {SkillEntityToModelMapper} from "./SkillEntityToModelMapper";
import {LanguageEntityToModelMapper} from "./LanguageEntityToModelMapper";
import {PathfinderCreatureProperties} from "../../../db/schemas/pathfinder/PathfinderCreatureProperties";
import {PathfinderCreaturePropertiesModel} from "../../../model/pathfinder/PathfinderCreaturePropertiesModel";
import {PathfinderLanguageModel} from "../../../model/pathfinder/PathfinderLanguageModel";
import {PathfinderTalentModel} from "../../../model/pathfinder/PathfinderTalentModel";
import {PathfinderSkillModel} from "../../../model/pathfinder/PathfinderSkillModel";
import {PathfinderActionModel} from "../../../model/pathfinder/PathfinderActionModel";
import {CreatureStats} from "../../../model/dataModel/CreatureStats";
import {attackProperty, pathFinderSaveThrows, stats} from "../../../types/backendTypes";
import {SavingThrows} from "../../../model/dataModel/SavingThrows";
import {AttackProperty} from "../../../model/dataModel/AttackProperty";
import {getEnumKeyForValue} from "../../../helper/HelperFunctions";
import {CreatureTypeEnum} from "../../../model/enumeration/CreatureTypeEnum";
import {AlignmentEnum} from "../../../model/enumeration/AlignmentEnum";
import {CreatureSizeEnum} from "../../../model/enumeration/CreatureSizeEnum";
import {Service} from "@tsed/di";

@Service()
export class PathfinderCreaturePropertyEntityToModelMapper {
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

    map = (pathfinderCreaturePropertyEntity: PathfinderCreatureProperties): PathfinderCreaturePropertiesModel => {
        if (!pathfinderCreaturePropertyEntity) {
            return null
        }
        const languageModels = this.mapLanguages(pathfinderCreaturePropertyEntity);
        const talentModels = this.mapTalents(pathfinderCreaturePropertyEntity);
        const skillModels = this.mapSkills(pathfinderCreaturePropertyEntity);
        const actionModels = this.mapActions(pathfinderCreaturePropertyEntity);

        return new PathfinderCreaturePropertiesModel(
            pathfinderCreaturePropertyEntity.uuid,
            getEnumKeyForValue(pathfinderCreaturePropertyEntity.type, CreatureTypeEnum),
            pathfinderCreaturePropertyEntity.armorclass,
            pathfinderCreaturePropertyEntity.hitpoints,
            getEnumKeyForValue(pathfinderCreaturePropertyEntity.alignment, AlignmentEnum),
            pathfinderCreaturePropertyEntity.creatureClass,
            pathfinderCreaturePropertyEntity.challenge,
            pathfinderCreaturePropertyEntity.movement,
            pathfinderCreaturePropertyEntity.ini,
            pathfinderCreaturePropertyEntity.baseAtk,
            getEnumKeyForValue(pathfinderCreaturePropertyEntity.size, CreatureSizeEnum),
            this.mapStatsStringToStatsDataModel(pathfinderCreaturePropertyEntity.stats),
            this.mapSaveThrowsStringToSaveThrowsDataModel(pathfinderCreaturePropertyEntity.saveThrows),
            pathfinderCreaturePropertyEntity.xp,
            pathfinderCreaturePropertyEntity.image,
            actionModels,
            languageModels,
            skillModels,
            talentModels,
            this.mapAttackPropertiesStringToAttackPropertiesDataModel(pathfinderCreaturePropertyEntity.attackProperties)
        )
    }

    private mapLanguages = (entity: PathfinderCreatureProperties): Array<PathfinderLanguageModel> | null => {
         if (entity.languages) {
            return entity.languages.map(languageEntity => {
                return this.languageEntityToModelMapper.map(languageEntity);
            });
        }
        return null;
    }

    private mapTalents = (entity: PathfinderCreatureProperties): Array<PathfinderTalentModel> | null => {
         if (entity.talents) {
            return entity.talents.map(talentEntity => {
                return this.talentEntityToModelMapper.map(talentEntity);
            });
        }
        return null;
    }

    private mapSkills = (entity: PathfinderCreatureProperties): Array<PathfinderSkillModel> | null => {
         if (entity.skills) {
            return entity.skills.map(skillEntity => {
              return this.skillEntityToModelMapper.map(skillEntity);
            });
        }
        return null;
    }

    private mapActions = (entity: PathfinderCreatureProperties): Array<PathfinderActionModel> | null => {
         if (entity.actions) {
            return entity.actions.map(actionEntity => {
                return this.actionEntityToModelMapper.map(actionEntity);
            })
        }
        return null
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
            const saveThrowsData: pathFinderSaveThrows = JSON.parse(saveThrowsString);
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