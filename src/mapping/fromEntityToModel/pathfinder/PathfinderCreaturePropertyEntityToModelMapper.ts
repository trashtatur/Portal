import {PathfinderActionEntityToModelMapper} from "./PathfinderActionEntityToModelMapper";
import {PathfinderTalentEntityToModelMapper} from "./PathfinderTalentEntityToModelMapper";
import {PathfinderSkillEntityToModelMapper} from "./PathfinderSkillEntityToModelMapper";
import {PathfinderLanguageEntityToModelMapper} from "./PathfinderLanguageEntityToModelMapper";
import {PathfinderCreatureProperties} from "../../../db/schemas/pathfinder/PathfinderCreatureProperties";
import {PathfinderCreaturePropertiesModel} from "../../../model/pathfinder/PathfinderCreaturePropertiesModel";
import {CreatureStatsModel} from "../../../model/dataModel/CreatureStatsModel";
import {attackProperty, pathFinderSaveThrows, stats} from "../../../types/backendTypes";
import {PathfinderSavingThrowsModel} from "../../../model/dataModel/pathfinder/PathfinderSavingThrowsModel";
import {NamedCreatureProperty} from "../../../model/dataModel/NamedCreatureProperty";
import {
    getEnumKeyForValue,
    mapNamedPropertiesStringToNamedPropertiesModel,
    mapStatsStringToStatsDataModel
} from "../../../helper/HelperFunctions";
import {TypeEnum} from "../../../model/enumeration/TypeEnum";
import {AlignmentEnum} from "../../../model/enumeration/AlignmentEnum";
import {PathfinderCreatureSizeEnum} from "../../../model/enumeration/pathfinder/PathfinderCreatureSizeEnum";
import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {Service} from "@tsed/di";

@Service()
export class PathfinderCreaturePropertyEntityToModelMapper
    implements EntityToModelMapperInterface<PathfinderCreatureProperties, PathfinderCreaturePropertiesModel> {

    private actionEntityToModelMapper: PathfinderActionEntityToModelMapper;
    private talentEntityToModelMapper: PathfinderTalentEntityToModelMapper;
    private skillEntityToModelMapper: PathfinderSkillEntityToModelMapper;
    private languageEntityToModelMapper: PathfinderLanguageEntityToModelMapper;

    constructor(
        actionEntityToModelMapper: PathfinderActionEntityToModelMapper,
        talentEntityToModelMapper: PathfinderTalentEntityToModelMapper,
        skillEntityToModelMapper: PathfinderSkillEntityToModelMapper,
        languageEntityToModelMapper: PathfinderLanguageEntityToModelMapper
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
        return new PathfinderCreaturePropertiesModel(
            pathfinderCreaturePropertyEntity.uuid,
            getEnumKeyForValue(pathfinderCreaturePropertyEntity.type, TypeEnum),
            pathfinderCreaturePropertyEntity.armorclass,
            pathfinderCreaturePropertyEntity.hitpoints,
            getEnumKeyForValue(pathfinderCreaturePropertyEntity.alignment, AlignmentEnum),
            pathfinderCreaturePropertyEntity.creatureClass,
            pathfinderCreaturePropertyEntity.challenge,
            pathfinderCreaturePropertyEntity.movement,
            pathfinderCreaturePropertyEntity.ini,
            pathfinderCreaturePropertyEntity.baseAtk,
            getEnumKeyForValue(pathfinderCreaturePropertyEntity.size, PathfinderCreatureSizeEnum),
            mapStatsStringToStatsDataModel(pathfinderCreaturePropertyEntity.stats),
            this.mapSaveThrowsStringToSaveThrowsDataModel(pathfinderCreaturePropertyEntity.saveThrows),
            pathfinderCreaturePropertyEntity.xp,
            pathfinderCreaturePropertyEntity.image,
            this.actionEntityToModelMapper.mapMultiple(pathfinderCreaturePropertyEntity.actions),
            this.languageEntityToModelMapper.mapMultiple(pathfinderCreaturePropertyEntity.languages),
            this.skillEntityToModelMapper.mapMultiple(pathfinderCreaturePropertyEntity.skills),
            this.talentEntityToModelMapper.mapMultiple(pathfinderCreaturePropertyEntity.talents),
            mapNamedPropertiesStringToNamedPropertiesModel(pathfinderCreaturePropertyEntity.attackProperties)
        )
    }


    mapMultiple(entities?: PathfinderCreatureProperties[]): PathfinderCreaturePropertiesModel[] | null {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.map(entity);
        });
    }

    private mapSaveThrowsStringToSaveThrowsDataModel = (saveThrowsString: string): PathfinderSavingThrowsModel | null => {
        try {
            const saveThrowsData: pathFinderSaveThrows = JSON.parse(saveThrowsString);
            return new PathfinderSavingThrowsModel(saveThrowsData.ref, saveThrowsData.will, saveThrowsData.fort)
        } catch (e) {

        }
    }
}