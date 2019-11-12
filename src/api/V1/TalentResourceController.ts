import {Controller} from "@tsed/common";
import {TalentService} from "./Services/TalentService";

@Controller('/talent')
class TalentResourceController {

    constructor(private readonly talentService:TalentService) {

    }
}