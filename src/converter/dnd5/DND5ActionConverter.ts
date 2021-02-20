import {ConverterInterface} from "../ConverterInterface";
import {DND5ActionModel} from "../../model/dnd5/DND5ActionModel";
import {DND5Action} from "../../db/schemas/DND5/DND5Action";
import {RangeTypeEnum} from "../../model/enumeration/RangeTypeEnum";
import {DND5DamageType} from "../../model/dnd5/DND5DamageType";
import {DND5DamageTypeEnum} from "../../model/enumeration/dnd5/DND5DamageTypeEnum";
import {getEnumKeyForValue} from "../../services/EnumKeyFromStringService";
import {convertDamageString} from "../DamageStringConverter";

export class DND5ActionConverter implements ConverterInterface<DND5Action, DND5ActionModel>{
    convertEntity = (entity: DND5Action): DND5ActionModel => {
        return new DND5ActionModel(
            entity.uuid,
            entity.name,
            getEnumKeyForValue(entity.rangeType, RangeTypeEnum),
            entity.attackBonus,
            entity.range,
            entity.magical,
            convertDamageString(entity.damage),
            this.mapDamageTypeStringToDamageTypeDataModel(entity.damageType),
            entity.additionalInfo
        )
    }

    convertMultipleEntities = (entities?: DND5Action[]): DND5ActionModel[] | null => {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.convertEntity(entity)
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