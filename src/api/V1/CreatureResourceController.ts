import {BodyParams, Controller, Get, PathParams, Post, Put, Status} from "@tsed/common";
import {MulterOptions, MultipartFile} from "@tsed/multipartfiles";
import {CreatureService} from "../../services/CreatureService";
import {creatureData} from "../../types/backendTypes";
import {SystemToIncludeService} from "../../helper/SystemToIncludeService";
import {DND5CreatureProperties} from "../../db/schemas/DND5/DND5CreatureProperties";
import {DND5CreaturePropertiesModel} from "../../model/dnd5/DND5CreaturePropertiesModel";
import {PathfinderCreatureProperties} from "../../db/schemas/pathfinder/PathfinderCreatureProperties";
import {PathfinderCreaturePropertiesModel} from "../../model/pathfinder/PathfinderCreaturePropertiesModel";


@Controller('/creature')
export class CreatureResourceController {
    private creatureService: CreatureService;
    private systemToIncludeService: SystemToIncludeService;

    constructor(
        creatureService: CreatureService,
        systemToIncludeService: SystemToIncludeService
    ) {
        this.systemToIncludeService = systemToIncludeService;
        this.creatureService = creatureService;
    }

    @Post('/:system')
    async createCreature(@BodyParams() creatureData: creatureData): Promise<string> {
        const creature = await this.creatureService.create(creatureData, []);
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
    async allCreatures(@PathParams('system') system: string): Promise<string> {
        const systemToInclude = this.systemToIncludeService.getSystemToInclude(system);
        let creatures = [];
        switch (systemToInclude) {
            case DND5CreatureProperties:
                creatures = await this.creatureService.findAll<DND5CreaturePropertiesModel>(systemToInclude, DND5CreaturePropertiesModel)
                break;
            case PathfinderCreatureProperties:
                creatures = await this.creatureService.findAll<PathfinderCreaturePropertiesModel>(systemToInclude, PathfinderCreaturePropertiesModel)
                break;
            default:
                break;
        }
        return JSON.stringify(creatures)
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