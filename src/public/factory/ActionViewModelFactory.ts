import type {PathfinderActionViewModel} from "../model/pathfinder/PathfinderActionViewModel";
import {createPathfinderActionViewModel} from "../model/pathfinder/PathfinderActionViewModel";
import {RangeTypeEnum} from "../model/enumeration/RangeTypeEnum";
import type {DiceRollSpecification} from "../model/DiceRollSpecification";
import {createDiceRollSpecification} from "../model/DiceRollSpecification";
import type {PathfinderDamageType} from "../model/pathfinder/PathfinderDamageType";
import {createPathfinderDamageType} from "../model/pathfinder/PathfinderDamageType";

export class ActionViewModelFactory {
    public static createEmpty = (): PathfinderActionViewModel => {
        return createPathfinderActionViewModel(
            '',
            '',
            RangeTypeEnum.NONE,
            null,
            null,
            createDiceRollSpecification(null, null, null),
            null,
            createPathfinderDamageType([], false, false),
            ''
        )
    }
}
