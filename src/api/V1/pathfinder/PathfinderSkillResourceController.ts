import {BodyParams, Controller, Get, Post} from "@tsed/common";
import {PathfinderSkillService} from "../../../services/pathfinder/PathfinderSkillService";

@Controller('/Pathfinder/skill')
export class PathfinderSkillResourceController {

    constructor(private readonly skillService: PathfinderSkillService) {

    }

    @Get()
    async allSkills(): Promise<string> {
        const skills = await this.skillService.findAll();
        return JSON.stringify(skills);
    }

    @Post()
    async createSkill(@BodyParams() skillData: any[]): Promise<string> {
        const skill = await this.skillService.create(skillData);
        return JSON.stringify(skill);
    }

}