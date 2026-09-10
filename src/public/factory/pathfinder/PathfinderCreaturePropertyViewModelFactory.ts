import type {PathfinderCreaturePropertiesViewModel} from "../../model/pathfinder/PathfinderCreaturePropertiesViewModel";
import {createPathfinderCreaturePropertiesViewModel} from "../../model/pathfinder/PathfinderCreaturePropertiesViewModel";
import {AlignmentEnum} from "../../model/enumeration/AlignmentEnum";
import {PathfinderCreatureSizeEnum} from "../../model/enumeration/pathfinder/PathfinderCreatureSizeEnum";
import type {PathfinderStatsViewModel} from "../../model/pathfinder/PathfinderStatsViewModel";
import {createPathfinderStatsViewModel} from "../../model/pathfinder/PathfinderStatsViewModel";
import type {PathfinderSavingThrowsViewModel} from "../../model/pathfinder/PathfinderSavingThrowsViewModel";
import {createPathfinderSavingThrowsViewModel} from "../../model/pathfinder/PathfinderSavingThrowsViewModel";

export class PathfinderCreaturePropertiesViewModelFactory {

    createEmpty = (): PathfinderCreaturePropertiesViewModel => {
        return createPathfinderCreaturePropertiesViewModel(
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
            createPathfinderStatsViewModel(
                null,
                null,
                null,
                null,
                null,
                null,
                PathfinderCreatureSizeEnum.EMPTY,
                null),
            createPathfinderSavingThrowsViewModel(
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
        return createPathfinderCreaturePropertiesViewModel(
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
            createPathfinderStatsViewModel(10, 10, 10, 10, 10, 10, PathfinderCreatureSizeEnum.MEDIUM, 0),
            createPathfinderSavingThrowsViewModel(0, 0, 0),
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
            createPathfinderStatsViewModel(
                creatureProperties.stats.strength,
                creatureProperties.stats.constitution,
                creatureProperties.stats.wisdom,
                creatureProperties.stats.intelligence,
                creatureProperties.stats.charisma,
                creatureProperties.stats.dexterity,
                creatureProperties.size,
                creatureProperties.baseAtk
            ),
            createPathfinderSavingThrowsViewModel(
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
