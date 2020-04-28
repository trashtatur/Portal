import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {PathfinderAction} from "../../../db/schemas/pathfinder/PathfinderAction";
import {PathfinderActionModel} from "../../../model/pathfinder/PathfinderActionModel";
import {RangeTypeEnum} from "../../../model/enumeration/RangeTypeEnum";
import {DamageType} from "../../../model/dataModel/DamageType";
import {Damage} from "../../../model/dataModel/Damage";
import {DamageTypesEnum} from "../../../model/enumeration/DamageTypesEnum";
import {getEnumKeyForValue} from "../../../helper/HelperFunctions";

export class ActionEntityToModelMapper implements EntityToModelMapperInterface {
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

    private mapDamageStringToDamageDataModel = (damageString: string): Damage => {
        //https://regex101.com/r/kmn2VW/2 for testing of regex
        const splitDamageString =
            damageString.match(/(?<diceCount>\d+)(?:d)(?<diceType>\d+)(?<bonus>[+\-]\d+)?/)
        const diceCount = splitDamageString.groups.diceCount;
        const diceType = splitDamageString.groups.diceType;
        const bonus = splitDamageString.groups.bonus ?? null;
        if (bonus) {
            return new Damage(parseInt(diceCount), parseInt(diceType), parseInt(bonus))
        }
        return new Damage(parseInt(diceCount), parseInt(diceType), null)
    }

    private mapDamageTypeStringToDamageTypeDataModel = (damageTypeString: string): DamageType => {
        const isHybrid = damageTypeString.includes('(hybrid)')
        const isMagic = damageTypeString.includes('(magic)')
        if (isHybrid) {
            damageTypeString = damageTypeString.replace('(hybrid)', '').trim();
        }
        if (isMagic) {
            damageTypeString = damageTypeString.replace('(magic)', '').trim();
        }
        const damageTypesArray = damageTypeString.split(',').map(damageType => {
            return getEnumKeyForValue(damageType, DamageTypesEnum)
        })
        return new DamageType(damageTypesArray, isMagic, isHybrid);
    }
}