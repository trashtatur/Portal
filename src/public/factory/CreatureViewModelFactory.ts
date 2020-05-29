import {CreatureViewModel} from "../model/CreatureViewModel";
import {PathfinderCreaturePropertiesDataToViewModelMapper} from "../mapping/pathfinder/PathfinderCreaturePropertiesDataToViewModelMapper";
import {PropertyFactory} from "./PropertyFactory";

export class CreatureViewModelFactory {
    private pathfinderPropertiesToViewModelMapper: PathfinderCreaturePropertiesDataToViewModelMapper;
    private propertiesFactory: PropertyFactory;

    constructor(
    ) {
        this.pathfinderPropertiesToViewModelMapper = new PathfinderCreaturePropertiesDataToViewModelMapper()
        this.propertiesFactory = new PropertyFactory()
    }

    public createFromExisting = <T>(creatureViewModel: CreatureViewModel<T>): CreatureViewModel<T> => {
        return new CreatureViewModel<T>(
            creatureViewModel.id,
            creatureViewModel.name,
            this.propertiesFactory.createFromExisting(creatureViewModel.properties)
        )
    }

    public createEmpty = <T>(property: { new(...args: any[]): T }): CreatureViewModel<T> => {
        return new CreatureViewModel<T>(
            '',
            '',
            this.propertiesFactory.createEmpty(property)
        )
    }

    public createSummonedCreature = <T>(property: { new(...args: any[]): T }): CreatureViewModel<T> => {
        return new CreatureViewModel<T>(
            '',
            '',
            this.propertiesFactory.createSummon(property)
        )
    }
}