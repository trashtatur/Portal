import {RangeType} from "../model/dataModel/RangeType";
import {DamageTypesEnum} from "../model/dataModel/DamageTypesEnum";
import validate from 'validate.js'
import {FormValidatorInterface} from "./FormValidatorInterface";

const constraints = {
    "name": {
        presence: true,
        length: {
            maximum: 255,
            tooLong: 'Your actions name was too long. Maximum is 255 characters'
        }
    },
    "rangeType": {
        presence: true,
        inclusion: {
            within: [RangeType.MELEE, RangeType.RANGED],
            message: `Range type must be either "${RangeType.RANGED}" or "${RangeType.MELEE}". You provided %{value}`
        }
    },
    "attackBonus": {
        presence: true,
        numericality: {
            onlyInteger: true
        }
    },
    "range": {
        presence: true,
        numericality: {
            onlyInteger: true,
            greaterThan: 0
        }
    },
    "damage": {
        presence: true,
        format: {
            pattern: (/^\d+([dDwW])\d+$/),
            message: 'Your damage must be in the format "integer > 0"(d or w)"integer > 0" (example 1d8 or also 1w12)'
        }
    },
    "critMod": {
        presence: true,
        numericality: {
            onlyInteger: true,
            greaterThan: 0
        }
    },
    "damageType": {
        presence: true,
        "damageType.type": function (value: Array<DamageTypesEnum>): boolean {
            const damageTypes = [
                DamageTypesEnum.PHYSICAL_SLASHING,
                DamageTypesEnum.PHYSICAL_PIERCING,
                DamageTypesEnum.PHYSICAL_BLUDGEONING,
                DamageTypesEnum.ENERGY_FIRE,
                DamageTypesEnum.ENERGY_COLD,
                DamageTypesEnum.ENERGY_ACID,
                DamageTypesEnum.ENERGY_ELECTRIC,
                DamageTypesEnum.ALIGNED_ENERGY,
                DamageTypesEnum.NEGATIVE_ENERGY,
                DamageTypesEnum.POSITIVE_ENERGY,
                DamageTypesEnum.FORCE,
                DamageTypesEnum.SONIC,
                DamageTypesEnum.UNTYPED_DAMAGE
            ];
            //Value must be array
            if (!value && !Array.isArray(value)) {
                return false
            }
            //Damage is hybrid damage
            if (value.length > 1) {
                //Damage must be indicated as hybrid by fist index
                if (value[0] != DamageTypesEnum.HYBRID_DAMAGE) {
                    return false;
                }
                //All damage types must be valid
                value.forEach(elem => {
                    if (!damageTypes.includes(elem)) {
                        return false
                    }
                })
            }
            //Damage is not hybrid damage
            if (value.length == 1) {
                //Damage type must be valid
                if (!damageTypes.includes(value[0])) {
                    return false;
                }
            }
            //array cant be empty
            if (value.length == 0) {
                return false
            }
            return true
        },
        "damageType.magical": {
            presence: true,
            type: "boolean"
        }
    },
    "additional info": {
        presence: false
    }
};

class ActionForm implements FormValidatorInterface{

    validate(data: object): boolean|object {
        return validate(data,constraints)
    }
}