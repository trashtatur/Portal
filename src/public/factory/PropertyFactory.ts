import {AbstractPropertyViewModel} from "../model/AbstractPropertyViewModel";
import {DND5CreaturePropertiesViewModel} from "../model/dnd5/DND5CreaturePropertiesViewModel";
import {PathfinderCreaturePropertiesViewModelFactory} from "./pathfinder/PathfinderCreaturePropertyViewModelFactory";
import {PathfinderCreaturePropertiesViewModel} from "../model/pathfinder/PathfinderCreaturePropertiesViewModel";

export class PropertyFactory{
    private pathfinderCreaturePropertiesViewModelFactory: PathfinderCreaturePropertiesViewModelFactory;

    constructor(
    ) {
        this.pathfinderCreaturePropertiesViewModelFactory = new PathfinderCreaturePropertiesViewModelFactory
    }

    createEmpty = <T extends AbstractPropertyViewModel>(property: { new(...args: any[]): T }): T => {
        switch (property.name) {
            case DND5CreaturePropertiesViewModel.name:
                return new DND5CreaturePropertiesViewModel() as T
            case PathfinderCreaturePropertiesViewModel.name:
                return this.pathfinderCreaturePropertiesViewModelFactory.createEmpty() as unknown as T
        }
    }

    createSummon = <T extends AbstractPropertyViewModel>(property: { new(...args: any[]): T }): T => {
        switch (property.name) {
            case DND5CreaturePropertiesViewModel.name:
                return new DND5CreaturePropertiesViewModel() as T
            case PathfinderCreaturePropertiesViewModel.name:
                return this.pathfinderCreaturePropertiesViewModelFactory.createSummon() as unknown as T
        }
    }
}