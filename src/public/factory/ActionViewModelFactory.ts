import {ActionViewModel} from "../model/ActionViewModel";
import {RangeTypeEnum} from "../model/enumeration/RangeTypeEnum";
import {DamageViewModel} from "../model/dataModel/DamageViewModel";
import {DamageType} from "../model/dataModel/DamageType";

export class ActionViewModelFactory {
    public static createEmpty = (): ActionViewModel => {
        return new ActionViewModel(
            '',
            '',
            RangeTypeEnum.NONE,
            null,
            null,
            new DamageViewModel(null, null, null),
            null,
            new DamageType([], false, false),
            ''
        )
    }
}