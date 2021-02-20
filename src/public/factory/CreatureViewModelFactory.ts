import {CreatureViewModel} from "../model/CreatureViewModel";
import {PropertyFactory} from "./PropertyFactory";
import {AbstractPropertyViewModel} from "@/public/model/AbstractPropertyViewModel";

export class CreatureViewModelFactory {
    private propertiesFactory: PropertyFactory;

    constructor(
    ) {
        this.propertiesFactory = new PropertyFactory()
    }

    public createFromExisting = <T extends AbstractPropertyViewModel>(creatureViewModel: CreatureViewModel<T>): CreatureViewModel<T> => {
        return new CreatureViewModel<T>(
            creatureViewModel.id,
            creatureViewModel.name,
            this.propertiesFactory.createFromExisting(creatureViewModel.creatureProperties)
        )
    }

    public createEmpty = <T extends AbstractPropertyViewModel>(property: { new(...args: any[]): T }): CreatureViewModel<T> => {
        return new CreatureViewModel<T>(
            '',
            '',
            this.propertiesFactory.createEmpty(property)
        )
    }

    public createSummonedCreature = <T extends AbstractPropertyViewModel>(property: { new(...args: any[]): T }): CreatureViewModel<T> => {
        return new CreatureViewModel<T>(
            '',
            '',
            this.propertiesFactory.createSummon(property)
        )
    }
}