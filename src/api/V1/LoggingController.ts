import {BodyParams, Controller, Post} from "@tsed/common";

@Controller('/log')
export class LoggingController {
    @Post()
    async log(@BodyParams('message') message: string, @BodyParams('severity') severity: string, @BodyParams('context') context): Promise<number> {
        return 200;
    }
}