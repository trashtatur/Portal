import {SystemEnum} from "../enumeration/SystemEnum";
import {PathfinderCreaturePropertiesModel} from "../model/pathfinder/PathfinderCreaturePropertiesModel";
import {DND5CreaturePropertiesModel} from "../model/dnd5/DND5CreaturePropertiesModel";

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
}