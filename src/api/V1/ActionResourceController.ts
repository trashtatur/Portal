import {Controller, Get, PathParams} from "@tsed/common";
import {Action} from "../../db/schemas/Action";

@Controller('/action')
class ActionResourceController {

    @Get()
    async allActions() {
        let actions = await Action.findAll()
    }

    @Get('/name/:actionname')
    async actionByName(@PathParams('actionname') actionname: string) {
        let action = await Action.findOne({where:{name:actionname}})
    }

}