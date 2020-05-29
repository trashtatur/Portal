import {CreatureModel} from "../../model/CreatureModel";
import {Creature} from "../../db/schemas/Creature";
import {Service} from "@tsed/di";
import {AbstractCreaturePropertyModel} from "../../model/AbstractCreaturePropertyModel";
import {PathfinderCreaturePropertyEntityToModelMapper} from "./pathfinder/PathfinderCreaturePropertyEntityToModelMapper";
import {DND5CreaturePropertiesModel} from "../../model/dnd5/DND5CreaturePropertiesModel";
import {PathfinderCreaturePropertiesModel} from "../../model/pathfinder/PathfinderCreaturePropertiesModel";
import {SystemEnum} from "../../enumeration/SystemEnum";
import {DND5CreaturePropertiesEntityToModelMapper} from "./dnd5/DND5CreaturePropertiesEntityToModelMapper";

@Service()
export class CreatureEntityToModelMapper  {
    private pathfinderCreaturePropertiesEntityToModelMapper: PathfinderCreaturePropertyEntityToModelMapper;
    private dnd5CreaturePropertiesEntityToModelMapper: DND5CreaturePropertiesEntityToModelMapper;

    constructor(
        dnd5CreaturePropertiesEntityToModelMapper: DND5CreaturePropertiesEntityToModelMapper,
        pathfinderCreaturePropertiesEntityToModelMapper: PathfinderCreaturePropertyEntityToModelMapper,
    ) {
        this.dnd5CreaturePropertiesEntityToModelMapper = dnd5CreaturePropertiesEntityToModelMapper;
        this.pathfinderCreaturePropertiesEntityToModelMapper = pathfinderCreaturePropertiesEntityToModelMapper;
    }

    map<T extends AbstractCreaturePropertyModel>(entity: Creature, property: { new(...args: any[]): T }): CreatureModel<T> {
        let propertyModel = null;
        const creatureModel = new CreatureModel(entity.uuid, entity.name, propertyModel)
        switch (property.name) {
            case DND5CreaturePropertiesModel.name:
                creatureModel.propertyType = SystemEnum.DND5
                propertyModel = this.dnd5CreaturePropertiesEntityToModelMapper.map(
                    entity['dnd5CreatureProperties'] ?? null
                )
                creatureModel.creatureProperties = propertyModel
                break;
            case PathfinderCreaturePropertiesModel.name:
                creatureModel.propertyType = SystemEnum.PATHFINDER
                propertyModel = this.pathfinderCreaturePropertiesEntityToModelMapper.map(
                    entity['pathfinderCreatureProperties'] ?? null
                )
                creatureModel.creatureProperties = propertyModel
                break;
        }
        return creatureModel
    }
}