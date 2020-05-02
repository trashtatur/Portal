import {BodyParams, Controller, Delete, Get, PathParams, Post, Put} from "@tsed/common";
import {DND5TalentService} from "../../../services/dnd5/DND5TalentService";

@Controller('/DND5/Talent')
export class DND5TalentResourceController {
    private dnD5TalentService: DND5TalentService;

    constructor(
        dnD5TalentService: DND5TalentService
    ) {
        this.dnD5TalentService = dnD5TalentService;
    }
    @Get()
    async getAllTalents(): Promise<string> {
        const talents = await this.dnD5TalentService.findAll();
        return JSON.stringify(talents);
    }

    @Get('id/:talentId')
    async getByTalentById(@PathParams('talentId') talentId: string): Promise<string>  {
        const talent = await this.dnD5TalentService.findOneBy('uuid', talentId);
        return JSON.stringify(talent);
    }

    @Post()
    async createTalent(@BodyParams('talentData') talentData): Promise<string> {
        const talent = await this.dnD5TalentService.create(talentData);
        return JSON.stringify(talent);
    }

    @Put()
    async updateTalent(@BodyParams('talentData') talentData): Promise<string> {
        const talent = await this.dnD5TalentService.update(talentData);
        return JSON.stringify(talent);
    }

    @Delete('/:talentId')
    async deleteTalent(@PathParams('talentId') talentId: string): Promise<string> {
        const success = await this.dnD5TalentService.delete(talentId);
        return `{success: ${success}}`
    }
}