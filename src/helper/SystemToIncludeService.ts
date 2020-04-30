import {Includeable} from "sequelize";
import {SystemEnum} from "../enumeration/SystemEnum";
import {PathfinderCreatureProperties} from "../db/schemas/pathfinder/PathfinderCreatureProperties";
import {DND5CreatureProperties} from "../db/schemas/DND5/DND5CreatureProperties";

export class SystemToIncludeService {

    getSystemToInclude = (getParameter: string): Includeable => {
        switch (getParameter) {
            case SystemEnum.PATHFINDER:
                return PathfinderCreatureProperties
            case SystemEnum.DND5:
                return DND5CreatureProperties
            default:
                break;
        }
    }
}