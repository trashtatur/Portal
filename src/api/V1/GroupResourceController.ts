import {Controller} from "@tsed/common";
import {GroupService} from "./Services/GroupService";

@Controller('/group')
export class GroupResourceController {

    constructor(private readonly groupService:GroupService) {

    }

}