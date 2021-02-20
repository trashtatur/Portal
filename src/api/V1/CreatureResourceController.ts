import {BodyParams, Controller, Get, PathParams, Post, Put, Status} from "@tsed/common";
import {MulterOptions, MultipartFile} from "@tsed/multipartfiles";
import {CreatureService} from "../../services/CreatureService";
import {creatureData} from "../../types/backendTypes";
import {SystemToIncludeService} from "../../services/SystemToIncludeService";
import {CreatureSerializerService} from "../../services/CreatureSerializerService";


@Controller('/creature')
export class CreatureResourceController {
    private creatureService: CreatureService;
    private systemToIncludeService: SystemToIncludeService;
    private creatureSerializerService: CreatureSerializerService;

    constructor(
        creatureService: CreatureService,
        creatureSerializerService: CreatureSerializerService,
        systemToIncludeService: SystemToIncludeService
    ) {
        this.creatureSerializerService = creatureSerializerService;
        this.systemToIncludeService = systemToIncludeService;
        this.creatureService = creatureService;
    }

    @Post('/:system')
    async createCreature(@BodyParams() creatureData: creatureData, @PathParams('system') system: string): Promise<string> {
        const systemToInclude = this.systemToIncludeService.getSystemToInclude(system);
        const creature = await this.creatureService.create<typeof systemToInclude>(creatureData, systemToInclude);
        return JSON.stringify(creature)
    }

    @Put('/:system/image')
    @Status(201)
    @MulterOptions({dest: `${process.cwd()}/.tmp`})
    async uploadCreatureImage(@MultipartFile("file") file: Express.Multer.File): Promise<boolean> {
        const intendedFilename = file.originalname;
        const currentResidence = file.path;
        await this.creatureService.moveCreatureImage(currentResidence, intendedFilename);
        return true
    }

    @Put('/:system/update/:creatureName/:creatureChallenge')
    async updateOneCreature(
        @BodyParams('creatureData') creatureData: creatureData,
        @PathParams('creatureName') creatureName: string,
        @PathParams('creatureChallenge') creatureChallenge: string
        ): Promise<string>
    {
        const updatedCreature = await this.creatureService
            .update(creatureData, creatureName, creatureChallenge, []);
        return JSON.stringify(updatedCreature)
    }

    @Get('/:system')
    async allCreatures(@PathParams('system') system: string): Promise<string[]> {
        const systemToInclude = this.systemToIncludeService.getSystemToInclude(system);
        const creatures = await this.creatureService.findAll<typeof systemToInclude>(systemToInclude)
        return this.creatureSerializerService.serializeCreatures(creatures);
    }

    @Get('/:system/name/:creatureName')
    async creatureByName(@PathParams("creatureName") creatureName: string): Promise<string> {
        const creature = await this.creatureService.findOneBy('name', creatureName, []);
        return JSON.stringify(creature)
    }

    @Get('/:system/id/:creatureId')
    async creatureById(@PathParams("creatureId") creatureId: string): Promise<string> {
        const creature = await this.creatureService.findOneBy('uuid', creatureId, []);
        return JSON.stringify(creature)
    }
}