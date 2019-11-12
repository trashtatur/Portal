import {Controller} from "@tsed/common";
import {FightService} from "./Services/FightService";


@Controller('/fight')
class FightResourceController {

    constructor(private readonly fightService:FightService) {

    }

}