import {CreatureViewModel} from "../model/CreatureViewModel";
import {PathfinderCreaturePropertiesDataToViewModelMapper} from "./pathfinder/PathfinderCreaturePropertiesDataToViewModelMapper";
import {DND5CreaturePropertiesDataToViewModelMapper} from "./dnd5/DND5CreaturePropertiesDataToViewModelMapper";
import {creatureData} from "../types/commonDataTypes";

export class CreatureDataToViewModelMapper {
    private pathfinderCreaturePropertiesDataToViewModelMapper: PathfinderCreaturePropertiesDataToViewModelMapper;
    private dnd5CreaturePropertiesDataToViewModelMapper: DND5CreaturePropertiesDataToViewModelMapper;

    constructor(
    ) {
        this.dnd5CreaturePropertiesDataToViewModelMapper = new DND5CreaturePropertiesDataToViewModelMapper();
        this.pathfinderCreaturePropertiesDataToViewModelMapper = new PathfinderCreaturePropertiesDataToViewModelMapper();
    }

    mapSingle = <T>(data: creatureData): CreatureViewModel<T> => {
        let properties = null;
        switch (data._propertyType) {
            case 'pathfinder':
                properties = this.pathfinderCreaturePropertiesDataToViewModelMapper.map(data._creatureProperties)
                break;
            case 'dnd5':
                properties = this.dnd5CreaturePropertiesDataToViewModelMapper.map(data._creatureProperties)
                break;
        }
        return new CreatureViewModel<T>(
            data._id,
            data._name,
            properties
        )
    }

    mapMultiple = <T>(data: creatureData[], property: { new(...args: any[]): T }): CreatureViewModel<T>[] => {
        const viewModels: CreatureViewModel<T>[] = [];
        data.forEach(creature => {
            viewModels.push(this.mapSingle<T>(creature));
        })
        return viewModels;
    }
}