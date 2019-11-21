import {BodyParams, Controller, Get, PathParams, Post, Put, Req, Res, Status} from "@tsed/common";
import {Language} from "../../db/schemas/Language";
import {Talent} from "../../db/schemas/Talent";
import {Skill} from "../../db/schemas/Skill";
import {Action} from "../../db/schemas/Action";
import {MulterOptions, MultipartFile} from "@tsed/multipartfiles";
import {CreatureService} from "./Services/CreatureService";
import {Includeable} from "sequelize";


@Controller('/creature')
export class CreatureResourceController {
    private creatureService: CreatureService;

    constructor(creatureService: CreatureService) {
        this.creatureService = creatureService;
    }

    /**
     * creatureData defined as follow:
     * {
     *      name: string,
     *      hitpoints: int,
     *      alignment: string,
     *      armorclass: number,
     *      creatureClass: string,
     *      challenge: int,
     *      movement: int,
     *      ini: int,
     *      baseAtk: int,
     *      ?xp: int,
     *      ?image: File,
     *      size: string',
     *      stats:{"str":int,"dex":int,"wis":int,"int":int,"cha":int,"con":int},
     *      saveThrows:{"ref":int,"will":int,"fort":int},
     *      ?languages: [string],
     *      ?skills: [string],
     *      ?talents: [string],
     *      ?actions: [Action],
     * }
     * @param creatureData
     */
    @Post()
    async createCreature(@BodyParams() creatureData:object): Promise<string> {
        let includeList = this.determineIncludeList(creatureData);
        let creature = await this.creatureService.create(creatureData,includeList);
        return JSON.stringify(creature)
    }

    @Put('/image')
    @Status(201)
    @MulterOptions({dest: `${process.cwd()}/.tmp`})
    async uploadCreatureImage(@MultipartFile("file") file: Express.Multer.File): Promise<any> {
        let intended_filename = file.originalname;
        let current_residence = file.path;
        await this.creatureService.moveCreatureImage(current_residence,intended_filename);
        return true
    }

    @Put('/name/:creatureName')
    async updateOneCreature(@BodyParams('creatureData') creatureData:object): Promise<string> {
        let includeList = this.determineIncludeList(creatureData);
        let updated_creature = await this.creatureService.update(creatureData,includeList);
        return JSON.stringify(updated_creature)
    }

    @Get()
    async allCreatures(): Promise<string> {
        let creatures = await this.creatureService.findAll([Language,Talent,Skill,Action]);
        return JSON.stringify(creatures)
    }

    @Get('/name/:creatureName')
    async creatureByName(@PathParams("creatureName") creatureName: string): Promise<string> {
        let creature = await this.creatureService.findOneBy('name',creatureName,[Language,Talent,Skill,Action]);
        return JSON.stringify(creature)
    }

    private determineIncludeList(creatureData:object): Includeable[] {
        let includeList = [];
        if ("languages" in creatureData) includeList.push(Language);
        if ("skills" in creatureData) includeList.push(Skill);
        if ("talents" in creatureData) includeList.push(Talent);
        if ("actions" in creatureData) includeList.push(Action);
        return includeList
    }
}