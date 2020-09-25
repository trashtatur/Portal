import {DataToModelMapperInterface} from "../../DataToModelMapperInterface";
import {PathfinderActionModel} from "../../../model/pathfinder/PathfinderActionModel";
import {DiceRollSpecification} from "../../../model/DiceRollSpecification";
import {PathfinderDamageType} from "../../../model/pathfinder/PathfinderDamageType";
import {RangeTypeEnum} from "../../../model/enumeration/RangeTypeEnum";
import {PathfinderDamageTypesEnum} from "../../../model/enumeration/pathfinder/PathfinderDamageTypesEnum";
import {MappingException} from "../../exception/MappingException";

export class PathfinderActionDataToModelMapper implements DataToModelMapperInterface<PathfinderActionModel> {

    map(data): PathfinderActionModel {
        return new PathfinderActionModel(
            data._id,
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

    mapMultiple = (data): PathfinderActionModel[] => {
        if (!data) {
            return []
        }
        return data.map(actionData => {
            return this.map(actionData);
        })
    }

    private createDamage(damageData): DiceRollSpecification {
        return new DiceRollSpecification(damageData._diceCount, damageData._diceType);
    }

    private createDamageType(damageTypeData): PathfinderDamageType {
        const isMagic = damageTypeData._isMagic;
        let isHybrid = false;
        if (damageTypeData._damageType.length > 1) {
            isHybrid = true;
        }
        const damageTypeEnums: PathfinderDamageTypesEnum[] =
            damageTypeData._damageType.map(damageType => {
                    return this.mapDamageTypeString(damageType);
                }
            );
        return new PathfinderDamageType(damageTypeEnums, isMagic, isHybrid)
    }

    private mapDamageTypeString(damageTypeString): PathfinderDamageTypesEnum {

        switch (damageTypeString) {
            case 'physical / bludgeoning':
                return PathfinderDamageTypesEnum.PHYSICAL_BLUDGEONING;
            case 'physical / slashing':
                return PathfinderDamageTypesEnum.PHYSICAL_SLASHING;
            case 'physical / piercing':
                return PathfinderDamageTypesEnum.PHYSICAL_PIERCING;
            case 'energy / acid':
                return PathfinderDamageTypesEnum.ENERGY_ACID;
            case 'energy / cold':
                return PathfinderDamageTypesEnum.ENERGY_COLD;
            case 'energy / fire':
                return PathfinderDamageTypesEnum.ENERGY_FIRE;
            case 'energy / electric':
                return PathfinderDamageTypesEnum.ENERGY_ELECTRIC;
            case 'positive energy':
                return PathfinderDamageTypesEnum.POSITIVE_ENERGY;
            case 'negative energy':
                return PathfinderDamageTypesEnum.NEGATIVE_ENERGY;
            case 'aligned energy':
                return PathfinderDamageTypesEnum.ALIGNED_ENERGY;
            case 'force':
                return PathfinderDamageTypesEnum.FORCE;
            case 'sonic':
                return PathfinderDamageTypesEnum.SONIC;
            case 'untyped damage':
                return PathfinderDamageTypesEnum.UNTYPED_DAMAGE;
            default:
                throw new MappingException(`${damageTypeString} is not a valid damage type`)
        }
    }

    private createRangeType(rangeTypeDataString: string): RangeTypeEnum {
        switch (rangeTypeDataString) {
            case 'Melee':
                return RangeTypeEnum.MELEE;
            case 'Ranged':
                return RangeTypeEnum.RANGED;
            default:
                throw new MappingException(`${rangeTypeDataString} is not a valid range type`)
        }
    }
}