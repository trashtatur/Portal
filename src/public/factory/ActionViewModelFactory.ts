import {PathfinderActionViewModel} from "../model/pathfinder/PathfinderActionViewModel";
import {RangeTypeEnum} from "../model/enumeration/RangeTypeEnum";
import {DiceRollSpecification} from "../model/DiceRollSpecification";
import {PathfinderDamageType} from "../model/pathfinder/PathfinderDamageType";

export class ActionViewModelFactory {
    public static createEmpty = (): PathfinderActionViewModel => {
        return new PathfinderActionViewModel(
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