import {RangeTypeEnum} from "../../model/enumeration/RangeTypeEnum";
import {FormValidatorInterface} from "../FormValidatorInterface";
import {Optional, Options, Type, validate} from 'validate-typescript';
import {DamageTypesEnum} from "../../model/enumeration/DamageTypesEnum";
import {ValidatorError} from "validate-typescript/lib/errors";

export class ActionForm implements FormValidatorInterface{

    schema = {
        _name: Type(String),
        _rangeType: Options([RangeTypeEnum.MELEE,RangeTypeEnum.RANGED]),
        _attackBonus: Type(Number),
        _range: Type(Number),
        _damage: {
            _diceCount: Type(Number),
            _diceType: Type(Number),
        },
        _critMod: Type(Number),
        _damageType: {
            _damageType: [Type(String)],
            _isMagic: Type(Boolean),
        },
        _additionalInfo: Optional(Type(String))
    };

    validate(data): boolean|object {
        try {
            if (this.validateDamageType(data._damageType._damageType)) {
                return validate(this.schema, data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    private validateDamageType(damageTypes: Array<DamageTypesEnum>): boolean {
        damageTypes.forEach(damageType => {
            if (!(Object.values(DamageTypesEnum).includes(damageType))) {
                throw new ValidatorError(
                    'ActionFormValidator',
                    'damageTypes',
                    damageType,
                    null)
            }
        });
        return true;
    }
}