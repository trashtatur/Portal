import {DND5CreaturePropertiesViewModel} from "../../model/dnd5/DND5CreaturePropertiesViewModel";
import {DiceRollSpecification} from "../../model/dataModel/DiceRollSpecification";
import {AlignmentEnum} from "../../model/enumeration/AlignmentEnum";
import {DND5CreatureTypeEnum} from "../../model/enumeration/dnd5/DND5CreatureTypeEnum";
import {DND5CreatureStatsViewModel} from "../../model/dataModel/dnd5/DND5CreatureStatsViewModel";
import {DND5CreatureSizeEnum} from "../../model/enumeration/dnd5/DND5CreatureSizeEnum";
import {DND5SpellSlotsViewModel} from "../../model/dataModel/dnd5/DND5SpellSlotsViewModel";
import {TypeEnum} from "../../model/enumeration/TypesEnum";
import {SpeedViewModel} from "@/public/model/dataModel/SpeedViewModel";
import {DND5SavingThrowsViewModel} from "@/public/model/dataModel/dnd5/DND5SavingThrowsViewModel";
import {InnateSpellCollection} from "@/public/model/dataModel/dnd5/InnateSpellCollection";

export class DND5CreaturePropertiesViewModelFactory {
    createEmpty = (): DND5CreaturePropertiesViewModel => {
        return new DND5CreaturePropertiesViewModel(
            '',
            TypeEnum.NONE,
            null,
            null,
            '',
            null,
            new DiceRollSpecification(null, null),
            AlignmentEnum.NONE,
            [],
            DND5CreatureTypeEnum.NONE,
            null,
            null,
            new DND5CreatureStatsViewModel(
                null,
                null,
                null,
                null,
                null,
                null
            ),
            DND5CreatureSizeEnum.NONE,
            new SpeedViewModel(
                null,
                null,
                null
            ),
            new DND5SpellSlotsViewModel(
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ),
            [],
            [],
            [],
            [],
            [],
            new DND5SavingThrowsViewModel(),
            '',
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            null,
        )
    }

    createFromExisting = (creatureProperties: DND5CreaturePropertiesViewModel): DND5CreaturePropertiesViewModel => {
        return null;
    }

    createSummon = (): DND5CreaturePropertiesViewModel => {
        return null;
    }
}