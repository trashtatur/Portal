import {CreatureViewModel} from "@/public/model/CreatureViewModel";
import {deserialize, serialize} from "typescript-json-serializer";
import {DND5CreaturePropertiesViewModel} from "@/public/model/dnd5/DND5CreaturePropertiesViewModel";
import {PathfinderCreaturePropertiesViewModel} from "@/public/model/pathfinder/PathfinderCreaturePropertiesViewModel";

export class CreatureSerializerService {

    serializeCreature = (model: CreatureViewModel<any>): string => {
        model.creatureProperties = serialize(model.creatureProperties);
        return serialize(model);
    }

    deserializeCreatures = (models): CreatureViewModel<any>[] => {
        return models.map(model => this.deserializeCreature(model));
    }

    deserializeCreature = (model): CreatureViewModel<any> => {
        const creatureModel = deserialize(model, CreatureViewModel)
        switch (model.propertyType) {
            case 'dnd5':
                creatureModel.creatureProperties =
                    deserialize(
                        creatureModel.creatureProperties,
                        DND5CreaturePropertiesViewModel
                    );
                break;
            case 'pathfinder':
                creatureModel.creatureProperties =
                    deserialize(
                        creatureModel.creatureProperties,
                        PathfinderCreaturePropertiesViewModel
                    );
                break;
            default:
                break;
        }
        return creatureModel;
    }
}