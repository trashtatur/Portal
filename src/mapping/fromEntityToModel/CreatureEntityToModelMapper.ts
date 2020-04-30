import {CreatureModel} from "../../model/CreatureModel";
import {Creature} from "../../db/schemas/Creature";
import {Service} from "@tsed/di";
import {AbstractCreaturePropertyModel} from "../../model/AbstractCreaturePropertyModel";
import {PathfinderCreaturePropertyEntityToModelMapper} from "./pathfinder/PathfinderCreaturePropertyEntityToModelMapper";
import {DND5CreaturePropertiesModel} from "../../model/dnd5/DND5CreaturePropertiesModel";
import {PathfinderCreaturePropertiesModel} from "../../model/pathfinder/PathfinderCreaturePropertiesModel";
import {GetParamToSystemEnum} from "../../enumeration/GetParamToSystemEnum";

@Service()
export class CreatureEntityToModelMapper  {
    private pathfinderCreaturePropertiesEntityToModelMapper: PathfinderCreaturePropertyEntityToModelMapper;

    constructor(
        pathfinderCreaturePropertiesEntityToModelMapper: PathfinderCreaturePropertyEntityToModelMapper,
    ) {
        this.pathfinderCreaturePropertiesEntityToModelMapper = pathfinderCreaturePropertiesEntityToModelMapper;
    }

    map<T extends AbstractCreaturePropertyModel>(entity: Creature, property: { new(...args: any[]): T }): CreatureModel<T> {
        let propertyModel = null;
        const creatureModel = new CreatureModel(entity.uuid, entity.name, propertyModel)
        switch (property.name) {
            case DND5CreaturePropertiesModel.name:
                creatureModel.propertyType = GetParamToSystemEnum.DND5
                break;
            case PathfinderCreaturePropertiesModel.name:
                creatureModel.propertyType = GetParamToSystemEnum.PATHFINDER
                propertyModel = this.pathfinderCreaturePropertiesEntityToModelMapper.map(
                    entity['pathfinderCreatureProperties'] ?? null
                )
                creatureModel.creatureProperties = propertyModel
                break;
        }
        return creatureModel
    }
}