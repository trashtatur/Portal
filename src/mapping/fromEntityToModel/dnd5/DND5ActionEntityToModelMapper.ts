import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {DND5ActionModel} from "../../../model/dnd5/DND5ActionModel";
import {DND5Action} from "../../../db/schemas/DND5/DND5Action";
import {getEnumKeyForValue, mapDamageStringToDamageDataModel} from "../../../helper/HelperFunctions";
import {RangeTypeEnum} from "../../../model/enumeration/RangeTypeEnum";
import {DND5DamageType} from "../../../model/dnd5/DND5DamageType";
import {DND5DamageTypeEnum} from "../../../model/enumeration/dnd5/DND5DamageTypeEnum";

export class DND5ActionEntityToModelMapper implements EntityToModelMapperInterface<DND5Action, DND5ActionModel>{
    map = (entity: DND5Action): DND5ActionModel => {
        return new DND5ActionModel(
            entity.uuid,
            entity.name,
            getEnumKeyForValue(entity.rangeType, RangeTypeEnum),
            entity.attackBonus,
            entity.range,
            entity.magical,
            mapDamageStringToDamageDataModel(entity.damage),
            this.mapDamageTypeStringToDamageTypeDataModel(entity.damageType),
            entity.additionalInfo
        )
    }

    mapMultiple = (entities?: DND5Action[]): DND5ActionModel[] | null => {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.map(entity)
        })
    }

    private mapDamageTypeStringToDamageTypeDataModel = (damageTypeString: string): DND5DamageType => {
        const isMagic = damageTypeString.includes('(magic)')
        if (isMagic) {
            damageTypeString = damageTypeString.replace('(magic)', '').trim();
        }
        const damageTypesArray = damageTypeString.split(',').map(damageType => {
            return getEnumKeyForValue(damageType, DND5DamageTypeEnum)
        })
        return new DND5DamageType(isMagic, damageTypesArray);
    }
}