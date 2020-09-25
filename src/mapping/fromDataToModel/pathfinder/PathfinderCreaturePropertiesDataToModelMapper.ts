import {DataToModelMapperInterface} from "../../DataToModelMapperInterface";
import {PathfinderCreaturePropertiesModel} from "../../../model/pathfinder/PathfinderCreaturePropertiesModel";
import {getEnumKeyForValue} from "../../../helper/HelperFunctions";
import {TypeEnum} from "../../../model/enumeration/TypeEnum";
import {PathfinderCreatureSizeEnum} from "../../../model/enumeration/pathfinder/PathfinderCreatureSizeEnum";
import {CreatureStatsModel} from "../../../model/CreatureStatsModel";
import {PathfinderSavingThrowsModel} from "../../../model/pathfinder/PathfinderSavingThrowsModel";
import {Service} from "@tsed/di";
import {PathfinderActionDataToModelMapper} from "./PathfinderActionDataToModelMapper";
import {PathfinderSkillDataToModelMapper} from "./PathfinderSkillDataToModelMapper";
import {PathfinderLanguageDataToModelMapper} from "./PathfinderLanguageDataToModelMapper";
import {PathfinderTalentDataToModelMapper} from "./PathfinderTalentDataToModelMapper";
import {NamedCreatureProperty} from "../../../model/NamedCreatureProperty";

@Service()
export class PathfinderCreaturePropertiesDataToModelMapper implements DataToModelMapperInterface<PathfinderCreaturePropertiesModel>{
    private pathfinderActionDataToModelMapper: PathfinderActionDataToModelMapper;
    private pathfinderSkillDataToModelMapper: PathfinderSkillDataToModelMapper;
    private pathfinderLanguageDataToModelMapper: PathfinderLanguageDataToModelMapper;
    private pathfinderTalentDataToModelMapper: PathfinderTalentDataToModelMapper;

    constructor(
        pathfinderActionDataToModelMapper: PathfinderActionDataToModelMapper,
        pathfinderSkillDataToModelMapper: PathfinderSkillDataToModelMapper,
        pathfinderLanguageDataToModelMapper: PathfinderLanguageDataToModelMapper,
        pathfinderTalentDataToModelMapper: PathfinderTalentDataToModelMapper

    ) {
        this.pathfinderSkillDataToModelMapper = pathfinderSkillDataToModelMapper;
        this.pathfinderLanguageDataToModelMapper = pathfinderLanguageDataToModelMapper;
        this.pathfinderTalentDataToModelMapper = pathfinderTalentDataToModelMapper;
        this.pathfinderActionDataToModelMapper = pathfinderActionDataToModelMapper;
    }

    /**
     * @param {pathfinderCreaturePropertiesData} data
     */
    map = (data): PathfinderCreaturePropertiesModel => {
        if (!data) {
            return null;
        }
        return new PathfinderCreaturePropertiesModel(
            data._id,
            getEnumKeyForValue(data._type, TypeEnum),
            data._armorclass,
            data._hitpoints,
            data._alignment,
            data._creatureClass,
            data._challenge,
            data._movement,
            data._ini,
            data._baseAtk,
            getEnumKeyForValue(data._size, PathfinderCreatureSizeEnum),
            this.mapStatsDataToModel(data._stats),
            this.mapSaveThrowsDataToModel(data._saveThrows),
            data._xp,
            data._image,
            this.pathfinderActionDataToModelMapper.mapMultiple(data._actions),
            this.pathfinderLanguageDataToModelMapper.mapMultiple(data._languages),
            this.pathfinderSkillDataToModelMapper.mapMultiple(data._skills),
            this.pathfinderTalentDataToModelMapper.mapMultiple(data._talents),
            this.mapAttackPropertiesDataToModel(data._attackProperties)
        );
    }
    /**
     * @param {pathfinderCreaturePropertiesData[]} data
     */
    mapMultiple = (data): PathfinderCreaturePropertiesModel[] => {
        if (!data) {
            return []
        }
        return data.map(property => {
            return this.map(property)
        })
    }

    mapStatsDataToModel = (stats): CreatureStatsModel => {
        return new CreatureStatsModel(
            stats._strength,
            stats._dexterity,
            stats._constitution,
            stats._intelligence,
            stats._wisdom,
            stats._charisma
        )
    }

    mapSaveThrowsDataToModel = (saveThrows): PathfinderSavingThrowsModel => {
        return new PathfinderSavingThrowsModel(
            saveThrows._reflex,
            saveThrows._wisdom,
            saveThrows._fortitude
        )
    }

    mapAttackPropertiesDataToModel = (attackProperties): NamedCreatureProperty[] => {
        return attackProperties.map(property => {
            return new NamedCreatureProperty(property._name, property._value)
        })
    }
}