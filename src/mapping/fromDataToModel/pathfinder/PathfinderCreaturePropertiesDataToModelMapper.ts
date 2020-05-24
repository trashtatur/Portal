import {DataToModelMapperInterface} from "../../DataToModelMapperInterface";
import {PathfinderCreaturePropertiesModel} from "../../../model/pathfinder/PathfinderCreaturePropertiesModel";
import {getEnumKeyForValue} from "../../../helper/HelperFunctions";
import {TypeEnum} from "../../../model/enumeration/TypeEnum";
import {PathfinderCreatureSizeEnum} from "../../../model/enumeration/pathfinder/PathfinderCreatureSizeEnum";

export class PathfinderCreaturePropertiesDataToModelMapper implements DataToModelMapperInterface<PathfinderCreaturePropertiesModel>{
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
            data._stats,
            data._saveThrows
        );
    }
}