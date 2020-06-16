import {BodyParams, Controller, Get, PathParams, Post} from "@tsed/common";

@Controller('/effect')
export class EffectsController {

    @Get('/:associatedClassName')
    async getEffectByAssociatedClass(@PathParams('associatedClassName') associatedClassName: string): Promise<string> {
        return JSON.stringify({poop: associatedClassName});
    }

    @Post('/create')
    async createEffect(@BodyParams('effect') effect): Promise<string> {
        return '';
    }
}