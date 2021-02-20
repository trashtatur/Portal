import {BodyParams, Controller, Get, PathParams, Post} from "@tsed/common";

@Controller('/statusEffect')
export class StatusEffectsController {

    @Get('/:associatedClassName')
    async getStatusEffectsByClassName(@PathParams('associatedClassName') associatedClassName: string): Promise<string> {
        return JSON.stringify([{statusName: 'poo', effects: []}]);
    }

    @Post('/create')
    async createEffect(@BodyParams('effect') effect): Promise<string> {
        return '';
    }
}