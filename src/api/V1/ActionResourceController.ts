import {Controller, Get, PathParams} from "@tsed/common";
import {Action} from "../../db/schemas/Action";
import {ActionService} from "./Services/ActionService";

@Controller('/action')
export class ActionResourceController {

    constructor(private readonly actionService:ActionService) {

    }

    @Get()
    async allActions() {
        let actions = await Action.findAll()
    }

    @Get('/name/:actionname')
    async actionByName(@PathParams('actionname') actionname: string) {
        let action = await Action.findOne({where:{name:actionname}})
    }

}