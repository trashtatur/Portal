import {BodyParams, Controller, Delete, Get, PathParams, Post, Put} from "@tsed/common";
import {DND5ActionService} from "../../../services/dnd5/DND5ActionService";

@Controller('/DND5/Action')
export class DND5ActionResourceController {
    private dnD5ActionService: DND5ActionService;

    constructor(
        dnD5ActionService: DND5ActionService
    ) {
        this.dnD5ActionService = dnD5ActionService;
    }

    @Get()
    async getAllActions(): Promise<string> {
        const actions = await this.dnD5ActionService.findAll();
        return JSON.stringify(actions);
    }

    @Get('id/:actionId')
    async getActionById(@PathParams('actionId') actionID: string): Promise<string>  {
        const action = await this.dnD5ActionService.findOneBy('uuid', actionID);
        return JSON.stringify(action);
    }

    @Post()
    async createAction(@BodyParams('actionData') actionData): Promise<string> {
        const action = await this.dnD5ActionService.create(actionData);
        return JSON.stringify(action);
    }

    @Put()
    async updateAction(@BodyParams('actionData') actionData): Promise<string> {
        const action = await this.dnD5ActionService.update(actionData);
        return JSON.stringify(action);
    }

    @Delete('/:actionId')
    async deleteAction(@PathParams('actionId') actionId: string): Promise<string> {
        const success = await this.dnD5ActionService.delete(actionId);
        return `{success: ${success}}`
    }
}