import {BodyParams, Controller, Get, PathParams, Post} from "@tsed/common";
import {PathfinderActionService} from "../../../services/pathfinder/PathfinderActionService";

@Controller('/Pathfinder/Action')
export class ActionResourceController {
    private readonly actionService: PathfinderActionService;

    constructor(actionService: PathfinderActionService) {
        this.actionService = actionService;
    }

    @Get()
    async allActions() {
        const actions = await this.actionService.findAll();
        return JSON.stringify(actions);
    }

    @Get('/name/:actionname')
    async actionByName(@PathParams('actionname') actionname: string) {
        const action = await this.actionService.findOneBy('name',actionname);
        return JSON.stringify(action)
    }

    @Post()
    async createAction(@BodyParams() actionData: object): Promise<string> {
        const action = this.actionService.create(actionData);
        return JSON.stringify(action);
    }
}