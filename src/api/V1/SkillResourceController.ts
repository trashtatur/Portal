import {Controller} from "@tsed/common";
import {SkillService} from "./Services/SkillService";

@Controller('/skill')
class SkillResourceController {

    constructor(private readonly skillService:SkillService) {

    }

}