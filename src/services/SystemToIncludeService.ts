import {SystemEnum} from "../enumeration/SystemEnum";
import {PathfinderCreaturePropertiesModel} from "../model/pathfinder/PathfinderCreaturePropertiesModel";
import {DND5CreaturePropertiesModel} from "../model/dnd5/DND5CreaturePropertiesModel";
import {DND5CreatureProperties} from "../db/schemas/DND5/DND5CreatureProperties";
import {PathfinderCreatureProperties} from "../db/schemas/pathfinder/PathfinderCreatureProperties";
import {Model} from "sequelize-typescript";

export class SystemToIncludeService {

    getSystemToInclude = (getParameter: string): { new(...args: any[])} => {
        switch (getParameter) {
            case SystemEnum.PATHFINDER:
                return PathfinderCreaturePropertiesModel
            case SystemEnum.DND5:
                return DND5CreaturePropertiesModel
            default:
                break;
        }
    }

    getSystemPropertyEntityTypeFromPropertyModelType = (modelType: { new(...args: any[])}): typeof Model => {
        switch (modelType) {
            case PathfinderCreaturePropertiesModel:
                return PathfinderCreatureProperties
            case DND5CreaturePropertiesModel:
                return DND5CreatureProperties
            default:
                return null;
        }
    }
}