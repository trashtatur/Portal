import {Controller} from "@tsed/common";
import {FightService} from "../../services/FightService";


@Controller('/fight')
export class FightResourceController {

    constructor(private readonly fightService:FightService) {

    }

}