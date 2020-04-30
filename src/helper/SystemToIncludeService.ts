import {Includeable} from "sequelize";
import {GetParamToSystemEnum} from "../enumeration/GetParamToSystemEnum";
import {PathfinderCreatureProperties} from "../db/schemas/pathfinder/PathfinderCreatureProperties";
import {DND5CreatureProperties} from "../db/schemas/DND5/DND5CreatureProperties";

export class SystemToIncludeService {

    getSystemToInclude = (getParameter: string): Includeable => {
        switch (getParameter) {
            case GetParamToSystemEnum.PATHFINDER:
                return PathfinderCreatureProperties
            case GetParamToSystemEnum.DND5:
                return DND5CreatureProperties
            default:
                break;
        }
    }
}