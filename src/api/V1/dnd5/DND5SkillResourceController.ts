import {BodyParams, Controller, Delete, Get, PathParams, Post, Put} from "@tsed/common";
import {DND5SkillService} from "../../../services/dnd5/DND5SkillService";

@Controller('/DND5/Skill')
export class DND5SkillResourceController {
    private dnD5SkillService: DND5SkillService;

    constructor(
        dnD5SkillService: DND5SkillService
    ) {
        this.dnD5SkillService = dnD5SkillService;
    }

    @Get()
    async getAllSkills(): Promise<string> {
        const skills = await this.dnD5SkillService.findAll();
        return JSON.stringify(skills);
    }

    @Get('id/:skillId')
    async getSkillById(@PathParams('skillId') skillId: string): Promise<string>  {
        const skill = await this.dnD5SkillService.findOneBy('uuid', skillId);
        return JSON.stringify(skill);
    }

    @Post()
    async createSkill(@BodyParams('skillData') skillData): Promise<string> {
        const skill = await this.dnD5SkillService.create(skillData);
        return JSON.stringify(skill);
    }

    @Put()
    async updateSkill(@BodyParams('skillData') skillData): Promise<string> {
        const skill = await this.dnD5SkillService.update(skillData);
        return JSON.stringify(skill);
    }

    @Delete('/:skillId')
    async deleteSkill(@PathParams('skillId') skillId: string): Promise<string> {
        const success = await this.dnD5SkillService.delete(skillId);
        return `{success: ${success}}`
    }
}