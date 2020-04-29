import {PathfinderCreaturePropertiesViewModel} from "../../model/pathfinder/PathfinderCreaturePropertiesViewModel";
import {AlignmentEnum} from "../../model/enumeration/AlignmentEnum";
import {CreatureSizesEnum} from "../../model/enumeration/CreatureSizesEnum";
import {StatsViewModel} from "../../model/dataModel/StatsViewModel";
import {SavingThrowsViewModel} from "../../model/dataModel/SavingThrowsViewModel";

export class PathfinderCreaturePropertiesViewModelFactory {

    createEmpty = (): PathfinderCreaturePropertiesViewModel => {
        return new PathfinderCreaturePropertiesViewModel(
            null,
            null,
            null,
            null,
            AlignmentEnum.NONE,
            '',
            null,
            null,
            null,
            null,
            CreatureSizesEnum.EMPTY,
            new StatsViewModel(
                null,
                null,
                null,
                null,
                null,
                null,
                CreatureSizesEnum.EMPTY,
                null),
            new SavingThrowsViewModel(
                null,
                null,
                null
            ),
            0,
            '',
            [],
            [],
            [],
            [],
            []
        )
    }

    createSummon = (): PathfinderCreaturePropertiesViewModel => {
        return new PathfinderCreaturePropertiesViewModel(
            null,
            null,
            null,
            null,
            AlignmentEnum.NONE,
            'summoned Entity',
            1,
            9,
            null,
            0,
            CreatureSizesEnum.MEDIUM,
            new StatsViewModel(10, 10, 10, 10, 10, 10, CreatureSizesEnum.MEDIUM, 0),
            new SavingThrowsViewModel(0, 0, 0),
            0,
            '',
            null,
            null,
            null,
            null,
            null
        )
    }
}