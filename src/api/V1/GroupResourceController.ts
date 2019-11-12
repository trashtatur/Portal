import {Controller} from "@tsed/common";
import {GroupService} from "./Services/GroupService";

@Controller('/group')
class GroupResourceController {

    constructor(private readonly groupService:GroupService) {

    }

}