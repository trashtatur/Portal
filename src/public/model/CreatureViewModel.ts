import {AbstractPropertyViewModel} from "./AbstractPropertyViewModel";

export interface CreatureViewModel<T extends AbstractPropertyViewModel> extends AbstractPropertyViewModel {
    id: string;
    name: string;
    creatureProperties: T;
}

export const createCreatureViewModel = <T extends AbstractPropertyViewModel>(id: string, name: string, properties: T): CreatureViewModel<T> => ({id, name, creatureProperties: properties});
