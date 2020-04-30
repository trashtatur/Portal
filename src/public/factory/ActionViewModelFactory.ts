import {ActionViewModel} from "../model/pathfinder/ActionViewModel";
import {RangeTypeEnum} from "../model/enumeration/RangeTypeEnum";
import {DamageViewModel} from "../model/dataModel/DamageViewModel";
import {PathfinderDamageType} from "../model/dataModel/pathfinder/PathfinderDamageType";

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
            new PathfinderDamageType([], false, false),
            ''
        )
    }
}