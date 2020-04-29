import {BodyParams, Controller, Get, Post} from "@tsed/common";
import {PathfinderTalentService} from "../../../services/pathfinder/PathfinderTalentService";
import * as CSV from 'csv-string';
import {MulterOptions} from "@tsed/multipartfiles";


@Controller('/Pathfinder/talent')
export class TalentResourceController {

    constructor(private readonly talentService:PathfinderTalentService) {

    }

    @Get()
    async allTalents(): Promise<string> {
        let talents = await this.talentService.findAll([]);
        return JSON.stringify(talents)
    }

    @Post()
    async createTalent(@BodyParams() talentData:any[]): Promise<string> {
        let talent = await this.talentService.create(talentData);
        return JSON.stringify(talent)
    }

    @Post('/csv')
    async importCSV(@BodyParams() data): Promise<string> {
        const result = CSV.parse(data.data);
        await this.talentService.bulkCreateFromCSV(result as unknown as Array<Array<string>>);
        return JSON.stringify(result);
    }
}