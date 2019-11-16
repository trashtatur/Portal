import {BodyParams, Controller, Get, Post} from "@tsed/common";
import {SkillService} from "./Services/SkillService";

@Controller('/skill')
export class SkillResourceController {

    constructor(private readonly skillService:SkillService) {

    }

    @Get()
    async allSkills(): Promise<string> {
        let skills = await this.skillService.findAll();
        return JSON.stringify(skills);
    }

    @Post()
    async createSkill(@BodyParams() skillData:any[]): Promise<string> {
        let skill = await this.skillService.create(skillData);
        return JSON.stringify(skill);
    }

}