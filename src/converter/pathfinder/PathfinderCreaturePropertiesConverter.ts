import {PathfinderActionConverter} from "./PathfinderActionConverter";
import {PathfinderTalentConverter} from "./PathfinderTalentConverter";
import {PathfinderSkillConverter} from "./PathfinderSkillConverter";
import {PathfinderLanguageConverter} from "./PathfinderLanguageConverter";
import {PathfinderCreatureProperties} from "../../db/schemas/pathfinder/PathfinderCreatureProperties";
import {PathfinderCreaturePropertiesModel} from "../../model/pathfinder/PathfinderCreaturePropertiesModel";
import {CreatureStatsModel} from "../../model/CreatureStatsModel";
import {namedProperty, stats} from "../../types/backendTypes";
import {PathfinderSavingThrowsModel} from "../../model/pathfinder/PathfinderSavingThrowsModel";
import {NamedCreatureProperty} from "../../model/NamedCreatureProperty";
import {TypeEnum} from "../../model/enumeration/TypeEnum";
import {AlignmentEnum} from "../../model/enumeration/AlignmentEnum";
import {PathfinderCreatureSizeEnum} from "../../model/enumeration/pathfinder/PathfinderCreatureSizeEnum";
import {ConverterInterface} from "../ConverterInterface";
import {Service} from "@tsed/di";
import {getEnumKeyForValue} from "../../services/EnumKeyFromStringService";
import {convertStatsString} from "../StatsStringConverter";
import {convertNamedPropertiesString} from "../NamedPropertiesStringConverter";

@Service()
export class PathfinderCreaturePropertiesConverter
    implements ConverterInterface<PathfinderCreatureProperties, PathfinderCreaturePropertiesModel> {

    private pathfinderActionConverter: PathfinderActionConverter;
    private pathfinderTalentConverter: PathfinderTalentConverter;
    private pathfinderSkillConverter: PathfinderSkillConverter;
    private pathfinderLanguageConverter: PathfinderLanguageConverter;

    constructor(
        pathfinderActionConverter: PathfinderActionConverter,
        pathfinderTalentConverter: PathfinderTalentConverter,
        pathfinderSkillConverter: PathfinderSkillConverter,
        pathfinderLanguageConverter: PathfinderLanguageConverter
    ) {
        this.pathfinderActionConverter = pathfinderActionConverter;
        this.pathfinderTalentConverter = pathfinderTalentConverter;
        this.pathfinderSkillConverter = pathfinderSkillConverter;
        this.pathfinderLanguageConverter = pathfinderLanguageConverter;
    }

    convertEntity = (pathfinderCreaturePropertyEntity: PathfinderCreatureProperties): PathfinderCreaturePropertiesModel => {
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
            convertStatsString(pathfinderCreaturePropertyEntity.stats),
            this.convertSaveThrowsStringToSaveThrowsDataModel(pathfinderCreaturePropertyEntity.saveThrows),
            pathfinderCreaturePropertyEntity.xp,
            pathfinderCreaturePropertyEntity.image,
            this.pathfinderActionConverter.convertMultipleEntities(pathfinderCreaturePropertyEntity.actions),
            this.pathfinderLanguageConverter.convertMultipleEntities(pathfinderCreaturePropertyEntity.languages),
            this.pathfinderSkillConverter.convertMultipleEntities(pathfinderCreaturePropertyEntity.skills),
            this.pathfinderTalentConverter.convertMultipleEntities(pathfinderCreaturePropertyEntity.talents),
            convertNamedPropertiesString(pathfinderCreaturePropertyEntity.attackProperties)
        )
    }


    convertMultipleEntities(entities?: PathfinderCreatureProperties[]): PathfinderCreaturePropertiesModel[] | null {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.convertEntity(entity);
        });
    }

    private convertSaveThrowsStringToSaveThrowsDataModel = (saveThrowsString: string): PathfinderSavingThrowsModel | null => {
        try {
            const saveThrowsData = JSON.parse(saveThrowsString);
            return new PathfinderSavingThrowsModel(saveThrowsData.ref, saveThrowsData.will, saveThrowsData.fort)
        } catch (e) {

        }
    }
}