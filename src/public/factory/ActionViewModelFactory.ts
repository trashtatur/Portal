import {ActionViewModel} from "../model/pathfinder/ActionViewModel";
import {RangeTypeEnum} from "../model/enumeration/RangeTypeEnum";
import {DiceRollSpecification} from "../model/DiceRollSpecification";
import {PathfinderDamageType} from "../model/pathfinder/PathfinderDamageType";

export class ActionViewModelFactory {
    public static createEmpty = (): ActionViewModel => {
        return new ActionViewModel(
            '',
            '',
            RangeTypeEnum.NONE,
            null,
            null,
            new DiceRollSpecification(null, null, null),
            null,
            new PathfinderDamageType([], false, false),
            ''
        )
    }
}