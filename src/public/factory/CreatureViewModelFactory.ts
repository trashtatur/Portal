import {CreatureViewModel} from "../model/CreatureViewModel";
import {CreatureSizesEnum} from "../model/enumeration/CreatureSizesEnum";
import {AlignmentEnum} from "../model/enumeration/AlignmentEnum";
import {StatsViewModel} from "../model/dataModel/StatsViewModel";
import {SavingThrowsViewModel} from "../model/dataModel/SavingThrowsViewModel";

export class CreatureViewModelFactory {

    public static createFromExisting = (creatureViewModel: CreatureViewModel): CreatureViewModel => {

        return new CreatureViewModel(
            creatureViewModel.id,
            creatureViewModel.name,
            creatureViewModel.type,
            creatureViewModel.armorclass,
            creatureViewModel.hitpoints,
            creatureViewModel.alignment,
            creatureViewModel.creatureClass,
            creatureViewModel.challenge,
            creatureViewModel.movement,
            creatureViewModel.ini,
            creatureViewModel.baseAtk,
            creatureViewModel.size,
            creatureViewModel.stats,
            creatureViewModel.saveThrows,
            creatureViewModel.xp,
            creatureViewModel.image,
            creatureViewModel.actions,
            creatureViewModel.languages,
            creatureViewModel.skills,
            creatureViewModel.talents,
            creatureViewModel.attackProperties
        )
    }

    public static createEmpty = (): CreatureViewModel => {
        return new CreatureViewModel(
            '',
            '',
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

    public static createSummonedCreature = (): CreatureViewModel => {
        return new CreatureViewModel(
            '',
            '',
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