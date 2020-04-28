import {CreatureModel} from "../../model/CreatureModel";
import {Creature} from "../../db/schemas/Creature";
import {Service} from "@tsed/di";
import {PropertyModel} from "../../model/PropertyModel";
import {PathfinderCreaturePropertyEntityToModelMapper} from "./pathfinder/PathfinderCreaturePropertyEntityToModelMapper";
import {DND5CreaturePropertiesModel} from "../../model/dnd5/DND5CreaturePropertiesModel";
import {PathfinderCreaturePropertiesModel} from "../../model/pathfinder/PathfinderCreaturePropertiesModel";

@Service()
export class CreatureEntityToModelMapper  {
    private pathfinderCreaturePropertiesEntityToModelMapper: PathfinderCreaturePropertyEntityToModelMapper;

    constructor(
        pathfinderCreaturePropertiesEntityToModelMapper: PathfinderCreaturePropertyEntityToModelMapper,
    ) {
        this.pathfinderCreaturePropertiesEntityToModelMapper = pathfinderCreaturePropertiesEntityToModelMapper;
    }

    map<T extends PropertyModel>(entity: Creature, property: { new(...args: any[]): T }): CreatureModel<T> {
        let propertyModel = null;
        switch (property.name) {
            case DND5CreaturePropertiesModel.name:
                break;
            case PathfinderCreaturePropertiesModel.name:
                propertyModel = this.pathfinderCreaturePropertiesEntityToModelMapper.map(
                    entity['pathfinderCreatureProperties'] ?? null
                )
                break;
        }
        return new CreatureModel(entity.uuid, entity.name, propertyModel)
    }
}