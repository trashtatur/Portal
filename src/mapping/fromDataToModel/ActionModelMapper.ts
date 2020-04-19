import {DataToModelMapperInterface} from "../ModelToEntityMapperInterface";
import {ActionModel} from "../../model/ActionModel";
import {Damage} from "../../model/dataModel/Damage";
import {DamageType} from "../../model/dataModel/DamageType";
import {RangeType} from "../../model/dataModel/RangeType";
import {DamageTypesEnum} from "../../model/dataModel/DamageTypesEnum";
import {MappingException} from "../exception/MappingException";

export class ActionModelMapper implements DataToModelMapperInterface {

    map(data): ActionModel {
        return new ActionModel(
            data._name,
            this.createRangeType(data._rangeType),
            data._attackBonus,
            data._range,
            this.createDamage(data._damage),
            data._critMod,
            this.createDamageType(data._damageType),
            data._additionalInfo
        );
    }

    private createDamage(damageData): Damage {
        return new Damage(damageData._diceCount, damageData._diceType);
    }

    private createDamageType(damageTypeData): DamageType {
        const isMagic = damageTypeData._isMagic;
        let isHybrid = false;
        if (damageTypeData._damageType.length > 1) {
            isHybrid = true;
        }
        const damageTypeEnums: DamageTypesEnum[] =
            damageTypeData._damageType.map(damageType => {
                    return this.mapDamageTypeString(damageType);
                }
            );
        return new DamageType(damageTypeEnums, isMagic, isHybrid)
    }

    private mapDamageTypeString(damageTypeString): DamageTypesEnum {

        switch (damageTypeString) {
            case 'physical / bludgeoning':
                return DamageTypesEnum.PHYSICAL_BLUDGEONING;
            case 'physical / slashing':
                return DamageTypesEnum.PHYSICAL_SLASHING;
            case 'physical / piercing':
                return DamageTypesEnum.PHYSICAL_PIERCING;
            case 'energy / acid':
                return DamageTypesEnum.ENERGY_ACID;
            case 'energy / cold':
                return DamageTypesEnum.ENERGY_COLD;
            case 'energy / fire':
                return DamageTypesEnum.ENERGY_FIRE;
            case 'energy / electric':
                return DamageTypesEnum.ENERGY_ELECTRIC;
            case 'positive energy':
                return DamageTypesEnum.POSITIVE_ENERGY;
            case 'negative energy':
                return DamageTypesEnum.NEGATIVE_ENERGY;
            case 'aligned energy':
                return DamageTypesEnum.ALIGNED_ENERGY;
            case 'force':
                return DamageTypesEnum.FORCE;
            case 'sonic':
                return DamageTypesEnum.SONIC;
            case 'untyped damage':
                return DamageTypesEnum.UNTYPED_DAMAGE;
            default:
                throw new MappingException(`${damageTypeString} is not a valid damage type`)
        }
    }

    private createRangeType(rangeTypeDataString: string): RangeType {
        switch (rangeTypeDataString) {
            case 'Melee':
                return RangeType.MELEE;
            case 'Ranged':
                return RangeType.RANGED;
            default:
                throw new MappingException(`${rangeTypeDataString} is not a valid range type`)
        }
    }
}