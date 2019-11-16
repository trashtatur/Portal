import {BodyParams, Controller, Get, PathParams, Post} from "@tsed/common";
import {Action} from "../../db/schemas/Action";
import {ActionService} from "./Services/ActionService";

@Controller('/Action')
export class ActionResourceController {

    constructor(private readonly actionService:ActionService) {

    }

    @Get()
    async allActions() {
        let actions = await this.actionService.findAll();
        return JSON.stringify(actions);
    }

    @Get('/name/:actionname')
    async actionByName(@PathParams('actionname') actionname: string) {
        let action = await this.actionService.findOneBy('name',actionname);
        return JSON.stringify(action)
    }

    @Post()
    async createAction(@BodyParams() actionData:object):Promise<string> {
        let action = this.actionService.create(actionData);
        return JSON.stringify(action);
    }

}