import {BodyParams, Controller, Get, Post} from "@tsed/common";
import {TalentService} from "./Services/TalentService";

@Controller('/talent')
export class TalentResourceController {

    constructor(private readonly talentService:TalentService) {

    }

    @Get()
    async allTalents(): Promise<string> {
        let talents = await this.talentService.findAll([]);
        return JSON.stringify(talents)
    }

    @Post()
    async createTalent(@BodyParams() talentData:any[]) {
        let talent = await this.talentService.create(talentData);
        return JSON.stringify(talent)
    }
}