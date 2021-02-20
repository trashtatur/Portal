import {ConverterInterface} from "../ConverterInterface";
import {PathfinderAction} from "../../db/schemas/pathfinder/PathfinderAction";
import {PathfinderActionModel} from "../../model/pathfinder/PathfinderActionModel";
import {RangeTypeEnum} from "../../model/enumeration/RangeTypeEnum";
import {PathfinderDamageType} from "../../model/pathfinder/PathfinderDamageType";
import {PathfinderDamageTypesEnum} from "../../model/enumeration/pathfinder/PathfinderDamageTypesEnum";
import {getEnumKeyForValue} from "../../services/EnumKeyFromStringService";
import {convertDamageString} from "../DamageStringConverter";

export class PathfinderActionConverter implements ConverterInterface<PathfinderAction, PathfinderActionModel> {
    convertEntity(entity: PathfinderAction): PathfinderActionModel {
        return new PathfinderActionModel(
            entity.uuid,
            entity.name,
            getEnumKeyForValue(entity.rangeType, RangeTypeEnum),
            entity.attackBonus,
            entity.range,
            convertDamageString(entity.damage),
            entity.critMod,
            this.mapDamageTypeStringToDamageTypeDataModel(entity.damageType),
            entity.additionalInfo
        )
    }

    convertMultipleEntities = (entities?: PathfinderAction[]): PathfinderActionModel[] | null => {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.convertEntity(entity);
        });
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