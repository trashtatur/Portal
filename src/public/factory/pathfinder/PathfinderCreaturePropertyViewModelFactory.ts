import {PathfinderCreaturePropertiesViewModel} from "../../model/pathfinder/PathfinderCreaturePropertiesViewModel";
import {AlignmentEnum} from "../../model/enumeration/AlignmentEnum";
import {PathfinderCreatureSizeEnum} from "../../model/enumeration/pathfinder/PathfinderCreatureSizeEnum";
import {PathfinderStatsViewModel} from "../../model/dataModel/pathfinder/PathfinderStatsViewModel";
import {PathfinderSavingThrowsViewModel} from "../../model/dataModel/pathfinder/PathfinderSavingThrowsViewModel";

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
            PathfinderCreatureSizeEnum.EMPTY,
            new PathfinderStatsViewModel(
                null,
                null,
                null,
                null,
                null,
                null,
                PathfinderCreatureSizeEnum.EMPTY,
                null),
            new PathfinderSavingThrowsViewModel(
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
            PathfinderCreatureSizeEnum.MEDIUM,
            new PathfinderStatsViewModel(10, 10, 10, 10, 10, 10, PathfinderCreatureSizeEnum.MEDIUM, 0),
            new PathfinderSavingThrowsViewModel(0, 0, 0),
            0,
            '',
            null,
            null,
            null,
            null,
            null
        )
    }

    createFromExisting = (creatureProperties: PathfinderCreaturePropertiesViewModel): PathfinderCreaturePropertiesViewModel => {
        const model = new  PathfinderCreaturePropertiesViewModel(
            creatureProperties.id,
            creatureProperties.type,
            creatureProperties.armorclass,
            creatureProperties.hitpoints,
            creatureProperties.alignment,
            creatureProperties.creatureClass,
            creatureProperties.challenge,
            creatureProperties.movement,
            creatureProperties.ini,
            creatureProperties.baseAtk,
            creatureProperties.size,
            new PathfinderStatsViewModel(
                creatureProperties.stats.strength,
                creatureProperties.stats.constitution,
                creatureProperties.stats.wisdom,
                creatureProperties.stats.intelligence,
                creatureProperties.stats.charisma,
                creatureProperties.stats.dexterity,
                creatureProperties.size,
                creatureProperties.baseAtk
            ),
            new PathfinderSavingThrowsViewModel(
                creatureProperties.saveThrows.reflex,
                creatureProperties.saveThrows.wisdom,
                creatureProperties.saveThrows.fortitude
            ),
            creatureProperties.xp,
            creatureProperties.image,
            creatureProperties.actions,
            creatureProperties.languages,
            creatureProperties.skills,
            creatureProperties.talents,
            creatureProperties.attackProperties
        )
        model.currentInitiative =
            Math.floor(Math.random() * (20 - 1) + 1) + creatureProperties.ini;
        model.label = creatureProperties.label;
        return model;
    }
}