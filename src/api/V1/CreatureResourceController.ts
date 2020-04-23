import {BodyParams, Controller, Get, PathParams, Post, Put, Status} from "@tsed/common";
import {Language} from "../../db/schemas/Language";
import {Talent} from "../../db/schemas/Talent";
import {Skill} from "../../db/schemas/Skill";
import {Action} from "../../db/schemas/Action";
import {MulterOptions, MultipartFile} from "@tsed/multipartfiles";
import {CreatureService} from "../../services/CreatureService";
import {Includeable} from "sequelize";
import {creatureData} from "../../types/backendTypes";


@Controller('/creature')
export class CreatureResourceController {
    private creatureService: CreatureService;

    constructor(creatureService: CreatureService) {
        this.creatureService = creatureService;
    }

    @Post()
    async createCreature(@BodyParams() creatureData: creatureData): Promise<string> {
        const includeList = this.determineIncludeList(creatureData);
        const creature = await this.creatureService.create(creatureData, includeList);
        return JSON.stringify(creature)
    }

    @Put('/image')
    @Status(201)
    @MulterOptions({dest: `${process.cwd()}/.tmp`})
    async uploadCreatureImage(@MultipartFile("file") file: Express.Multer.File): Promise<any> {
        const intended_filename = file.originalname;
        const current_residence = file.path;
        await this.creatureService.moveCreatureImage(current_residence, intended_filename);
        return true
    }

    @Put('/update/:creatureName/:creatureChallenge')
    async updateOneCreature(
        @BodyParams('creatureData') creatureData: creatureData,
        @PathParams('creatureName') creatureName: string,
        @PathParams('creatureChallenge') creatureChallenge: string
        ): Promise<string>
    {
        const includeList = this.determineIncludeList(creatureData);
        const updated_creature = await this.creatureService
            .update(creatureData, creatureName, creatureChallenge, includeList);
        return JSON.stringify(updated_creature)
    }

    @Get()
    async allCreatures(): Promise<string> {
        const creatures = await this.creatureService.findAll();
        return JSON.stringify(creatures)
    }

    @Get('/name/:creatureName')
    async creatureByName(@PathParams("creatureName") creatureName: string): Promise<string> {
        const creature = await this.creatureService.findOneBy('name', creatureName, [Language, Talent, Skill, Action]);
        return JSON.stringify(creature)
    }

    @Get('/id/:creatureId')
    async creatureById(@PathParams("creatureId") creatureId: string): Promise<string> {
        const creature = await this.creatureService.findOneBy('uuid', creatureId, [Language, Talent, Skill, Action]);
        return JSON.stringify(creature)
    }

    private determineIncludeList(creatureData: creatureData): Includeable[] {
        const includeList = [];
        if ("languages" in creatureData) includeList.push(Language);
        if ("skills" in creatureData) includeList.push(Skill);
        if ("talents" in creatureData) includeList.push(Talent);
        if ("actions" in creatureData) includeList.push(Action);
        return includeList
    }
}