import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {PathfinderAction} from "../../../db/schemas/pathfinder/PathfinderAction";
import {PathfinderActionModel} from "../../../model/pathfinder/PathfinderActionModel";
import {RangeTypeEnum} from "../../../model/enumeration/RangeTypeEnum";
import {PathfinderDamageType} from "../../../model/dataModel/pathfinder/PathfinderDamageType";
import {DiceRollSpecification} from "../../../model/dataModel/DiceRollSpecification";
import {PathfinderDamageTypesEnum} from "../../../model/enumeration/pathfinder/PathfinderDamageTypesEnum";
import {getEnumKeyForValue} from "../../../helper/HelperFunctions";

export class PathfinderActionEntityToModelMapper implements EntityToModelMapperInterface {
    map(entity: PathfinderAction): PathfinderActionModel {
        return new PathfinderActionModel(
            entity.uuid,
            entity.name,
            getEnumKeyForValue(entity.rangeType, RangeTypeEnum),
            entity.attackBonus,
            entity.range,
            this.mapDamageStringToDamageDataModel(entity.damage),
            entity.critMod,
            this.mapDamageTypeStringToDamageTypeDataModel(entity.damageType),
            entity.additionalInfo
        )
    }

    private mapDamageStringToDamageDataModel = (damageString: string): DiceRollSpecification => {
        //https://regex101.com/r/kmn2VW/2 for testing of regex
        const splitDamageString =
            damageString.match(/(?<diceCount>\d+)(?:d)(?<diceType>\d+)(?<bonus>[+\-]\d+)?/)
        const diceCount = splitDamageString.groups.diceCount;
        const diceType = splitDamageString.groups.diceType;
        const bonus = splitDamageString.groups.bonus ?? null;
        if (bonus) {
            return new DiceRollSpecification(parseInt(diceCount), parseInt(diceType), parseInt(bonus))
        }
        return new DiceRollSpecification(parseInt(diceCount), parseInt(diceType), null)
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