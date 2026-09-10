import {ModelInterface} from "./ModelInterface";
import {AbstractCreaturePropertyModel} from "./AbstractCreaturePropertyModel";
import {SystemEnum} from "../enumeration/SystemEnum";

export interface CreatureModel<T extends AbstractCreaturePropertyModel> {
    id: string;
    name: string;
    creatureProperties: T;
    propertyType?: SystemEnum;
}

export const createCreatureModel = <T extends AbstractCreaturePropertyModel>(id: string, name: string, creatureProperties: T): CreatureModel<T> => ({id, name, creatureProperties});
