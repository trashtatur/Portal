import {AbstractCreaturePropertyModel} from "../../model/AbstractCreaturePropertyModel";
import {CreatureModel} from "../../model/CreatureModel";
import {DND5CreaturePropertiesModel} from "../../model/dnd5/DND5CreaturePropertiesModel";
import {SystemEnum} from "../../enumeration/SystemEnum";
import {PathfinderCreaturePropertiesModel} from "../../model/pathfinder/PathfinderCreaturePropertiesModel";
import {Service} from "@tsed/di";
import {DND5CreaturePropertiesDataToModelMapper} from "./dnd5/DND5CreaturePropertiesDataToModelMapper";
import {PathfinderCreaturePropertiesDataToModelMapper} from "./pathfinder/PathfinderCreaturePropertiesDataToModelMapper";
import {creatureData} from "../../types/backendTypes";

@Service()
export class CreatureDataToModelMapper {
    private dnd5CreaturePropertiesDataToModelMapper: DND5CreaturePropertiesDataToModelMapper;
    private pathfinderCreaturePropertiesDataToModelMapper: PathfinderCreaturePropertiesDataToModelMapper;

    constructor(
        dnd5CreaturePropertiesDataToModelMapper: DND5CreaturePropertiesDataToModelMapper,
        pathfinderCreaturePropertiesDataToModelMapper: PathfinderCreaturePropertiesDataToModelMapper
    ) {
        this.dnd5CreaturePropertiesDataToModelMapper = dnd5CreaturePropertiesDataToModelMapper;
        this.pathfinderCreaturePropertiesDataToModelMapper = pathfinderCreaturePropertiesDataToModelMapper;
    }

    map = <T extends AbstractCreaturePropertyModel>(data: creatureData, property: { new(...args: any[]): T }): CreatureModel<T> => {
        let propertyModel = null;
        const creatureModel = new CreatureModel(data._id ?? null, data._name, propertyModel)
        switch (property.name) {
            case DND5CreaturePropertiesModel.name:
                creatureModel.propertyType = SystemEnum.DND5
                propertyModel = this.dnd5CreaturePropertiesDataToModelMapper.map(
                    data._properties
                )
                creatureModel.creatureProperties = propertyModel
                break;
            case PathfinderCreaturePropertiesModel.name:
                creatureModel.propertyType = SystemEnum.PATHFINDER
                propertyModel = this.pathfinderCreaturePropertiesDataToModelMapper.map(
                    data._properties ?? null
                )
                creatureModel.creatureProperties = propertyModel
                break;
        }
        return creatureModel
    }
}