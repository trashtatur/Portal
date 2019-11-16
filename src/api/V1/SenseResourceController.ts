import {BodyParams, Controller, Get, Post} from "@tsed/common";
import {SenseService} from "./Services/SenseService";

@Controller('/sense')
export class SenseResourceController {

    constructor(private readonly senseService:SenseService) {

    }

    @Get()
    async allSense(): Promise<string> {
        let senses = await this.senseService.findAll();
        return JSON.stringify(senses)
    }

    @Post()
    async createSense(@BodyParams() senseData:any[]): Promise<string> {
        let sense = await this.senseService.create(senseData);
        return JSON.stringify(sense)
    }
}