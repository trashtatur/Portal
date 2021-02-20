import {BodyParams, Controller, Get, PathParams, Post, Put} from "@tsed/common";
import {AdventureService} from "../../services/AdventureService";
import {adventureData} from "../../types/backendTypes";
import {serialize} from "typescript-json-serializer";

@Controller('/Adventure')
export class AdventureResourceController {
    private readonly adventureService: AdventureService;

    constructor(adventureService: AdventureService) {
        this.adventureService = adventureService;
    }


    @Get('/id/:adventureId')
    async adventureById(@PathParams('adventureId') adventureId: string): Promise<string> {
        const adventure = await this.adventureService.findOneBy('uuid', adventureId);
        return JSON.stringify(adventure);
    }

    @Get()
    async allAdventures(): Promise<string[]> {
        const adventures = await this.adventureService.findAll();
        return adventures.map(adventure => serialize(adventure));
    }

    @Post()
    async createAdventure(@BodyParams() adventureData: adventureData): Promise<string> {
        const adventureModel = this.adventureService.create(adventureData);
        return '';
    }

    @Put()
    async updateAdventure(@BodyParams() adventureData: adventureData): Promise<string> {
        return ''
    }
}