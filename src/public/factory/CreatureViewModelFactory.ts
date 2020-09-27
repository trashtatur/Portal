import {CreatureViewModel} from "../model/CreatureViewModel";
import {PathfinderCreaturePropertiesDataToViewModelMapper} from "../mapping/pathfinder/PathfinderCreaturePropertiesDataToViewModelMapper";
import {PropertyFactory} from "./PropertyFactory";
import {AbstractPropertyViewModel} from "@/public/model/AbstractPropertyViewModel";

export class CreatureViewModelFactory {
    private pathfinderPropertiesToViewModelMapper: PathfinderCreaturePropertiesDataToViewModelMapper;
    private propertiesFactory: PropertyFactory;

    constructor(
    ) {
        this.pathfinderPropertiesToViewModelMapper = new PathfinderCreaturePropertiesDataToViewModelMapper()
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