import type {CreatureViewModel} from "../model/CreatureViewModel";
import {createCreatureViewModel} from "../model/CreatureViewModel";
import {PropertyFactory} from "./PropertyFactory";
import {AbstractPropertyViewModel} from "@/public/model/AbstractPropertyViewModel";

export class CreatureViewModelFactory {
    private propertiesFactory: PropertyFactory;

    constructor(
    ) {
        this.propertiesFactory = new PropertyFactory()
    }

    public createFromExisting = <T extends AbstractPropertyViewModel>(creatureViewModel: CreatureViewModel<T>): CreatureViewModel<T> => {
        return createCreatureViewModel<T>(
            creatureViewModel.id,
            creatureViewModel.name,
            this.propertiesFactory.createFromExisting(creatureViewModel.creatureProperties)
        )
    }

    public createEmpty = <T extends AbstractPropertyViewModel>(name: string): CreatureViewModel<T> => {
        return createCreatureViewModel<T>(
            '',
            '',
            this.propertiesFactory.createEmpty(name)
        )
    }

    public createSummonedCreature = <T extends AbstractPropertyViewModel>(name: string): CreatureViewModel<T> => {
        return createCreatureViewModel<T>(
            '',
            '',
            this.propertiesFactory.createSummon(name)
        )
    }
}
