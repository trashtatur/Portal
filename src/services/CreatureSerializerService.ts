import {Service} from "@tsed/di";
import {deserialize, serialize} from "typescript-json-serializer";
import {DND5CreaturePropertiesModel} from "../model/dnd5/DND5CreaturePropertiesModel";
import {CreatureModel} from "../model/CreatureModel";
import {PathfinderCreaturePropertiesModel} from "../model/pathfinder/PathfinderCreaturePropertiesModel";
import {AbstractCreaturePropertyModel} from "../model/AbstractCreaturePropertyModel";

@Service()
export class CreatureSerializerService {

    serializeCreature = (model: CreatureModel<any>): string => {
        model.creatureProperties = serialize(model.creatureProperties);
        return serialize(model)
    }

    serializeCreatures = (models: CreatureModel<any>[]): string[] => {
        return models.map(model => this.serializeCreature(model));
    }

    deserializeCreature = <T extends AbstractCreaturePropertyModel>(model, propertyModelType: { new(...args: any[]): T }): CreatureModel<T> => {
        const creatureModel = deserialize(model, CreatureModel)
        switch (propertyModelType.name) {
            case DND5CreaturePropertiesModel.name:
                creatureModel.creatureProperties =
                    deserialize(
                        creatureModel.creatureProperties,
                        DND5CreaturePropertiesModel
                    );
                break;
            case PathfinderCreaturePropertiesModel.name:
                creatureModel.creatureProperties =
                    deserialize(
                        creatureModel.creatureProperties,
                        PathfinderCreaturePropertiesModel
                    );
                break;
            default:
                break;
        }
        return creatureModel;
    }
}