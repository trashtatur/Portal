import {CreatureViewModel} from "@/public/model/CreatureViewModel";
import {deserialize, serialize} from "typescript-json-serializer";
import {DND5CreaturePropertiesViewModel} from "@/public/model/dnd5/DND5CreaturePropertiesViewModel";
import {PathfinderCreaturePropertiesViewModel} from "@/public/model/pathfinder/PathfinderCreaturePropertiesViewModel";
import {AbstractPropertyViewModel} from "@/public/model/AbstractPropertyViewModel";

export const serializeCreature = <T extends AbstractPropertyViewModel>(model: CreatureViewModel<T>): string => {
    model.creatureProperties = serialize(model.creatureProperties);
    return serialize(model);
}

export const deserializeCreature = <T extends AbstractPropertyViewModel>(model): CreatureViewModel<T> => {
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

export const deserializeCreatures = <T extends AbstractPropertyViewModel>(models): CreatureViewModel<T>[] => {
    return models.map(model => deserializeCreature(model));
}
