import {AbstractPropertyViewModel} from "../model/AbstractPropertyViewModel";
import {DND5CreaturePropertiesViewModel} from "../model/dnd5/DND5CreaturePropertiesViewModel";
import {PathfinderCreaturePropertiesViewModelFactory} from "./pathfinder/PathfinderCreaturePropertyViewModelFactory";
import {PathfinderCreaturePropertiesViewModel} from "../model/pathfinder/PathfinderCreaturePropertiesViewModel";
import {DND5CreaturePropertiesViewModelFactory} from "./dnd5/DND5CreaturePropertiesViewModelFactory";

export class PropertyFactory{
    private pathfinderCreaturePropertiesViewModelFactory: PathfinderCreaturePropertiesViewModelFactory;
    private dnd5CreaturePropertiesViewModelFactory: DND5CreaturePropertiesViewModelFactory;

    constructor(
    ) {
        this.dnd5CreaturePropertiesViewModelFactory = new DND5CreaturePropertiesViewModelFactory();
        this.pathfinderCreaturePropertiesViewModelFactory = new PathfinderCreaturePropertiesViewModelFactory
    }

    createEmpty = <T extends AbstractPropertyViewModel>(property: { new(...args: any[]): T }): T => {
        switch (property.name) {
            case DND5CreaturePropertiesViewModel.name:
                return this.dnd5CreaturePropertiesViewModelFactory.createEmpty() as unknown as T
            case PathfinderCreaturePropertiesViewModel.name:
                return this.pathfinderCreaturePropertiesViewModelFactory.createEmpty() as unknown as T
        }
    }

    createSummon = <T extends AbstractPropertyViewModel>(property: { new(...args: any[]): T }): T => {
        switch (property.name) {
            case DND5CreaturePropertiesViewModel.name:
                return this.dnd5CreaturePropertiesViewModelFactory.createSummon() as unknown as T
            case PathfinderCreaturePropertiesViewModel.name:
                return this.pathfinderCreaturePropertiesViewModelFactory.createSummon() as unknown as T
        }
    }
}