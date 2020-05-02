import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {PathfinderAction} from "../../../db/schemas/pathfinder/PathfinderAction";
import {PathfinderActionModel} from "../../../model/pathfinder/PathfinderActionModel";
import {RangeTypeEnum} from "../../../model/enumeration/RangeTypeEnum";
import {PathfinderDamageType} from "../../../model/dataModel/pathfinder/PathfinderDamageType";
import {PathfinderDamageTypesEnum} from "../../../model/enumeration/pathfinder/PathfinderDamageTypesEnum";
import {getEnumKeyForValue, mapDamageStringToDamageDataModel} from "../../../helper/HelperFunctions";

export class PathfinderActionEntityToModelMapper implements EntityToModelMapperInterface {
    map(entity: PathfinderAction): PathfinderActionModel {
        return new PathfinderActionModel(
            entity.uuid,
            entity.name,
            getEnumKeyForValue(entity.rangeType, RangeTypeEnum),
            entity.attackBonus,
            entity.range,
            mapDamageStringToDamageDataModel(entity.damage),
            entity.critMod,
            this.mapDamageTypeStringToDamageTypeDataModel(entity.damageType),
            entity.additionalInfo
        )
    }

    private mapDamageTypeStringToDamageTypeDataModel = (damageTypeString: string): PathfinderDamageType => {
        const isHybrid = damageTypeString.includes('(hybrid)')
        const isMagic = damageTypeString.includes('(magic)')
        if (isHybrid) {
            damageTypeString = damageTypeString.replace('(hybrid)', '').trim();
        }
        if (isMagic) {
            damageTypeString = damageTypeString.replace('(magic)', '').trim();
        }
        const damageTypesArray = damageTypeString.split(',').map(damageType => {
            return getEnumKeyForValue(damageType, PathfinderDamageTypesEnum)
        })
        return new PathfinderDamageType(damageTypesArray, isMagic, isHybrid);
    }
}