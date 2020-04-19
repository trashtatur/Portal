import {BodyParams, Controller, Get, PathParams, Post, Put} from "@tsed/common";
import {AdventureService} from "../../services/AdventureService";
import {adventureData} from "../../types/backendTypes";

@Controller('/Adventure')
export class AdventureResourceController {
    private readonly adventureService: AdventureService;

    constructor(adventureService: AdventureService) {
        this.adventureService = adventureService;
    }


    @Get('/id/:adventureId')
    async adventureById(@PathParams('adventureId') adventureId: number): Promise<string> {
        return ''
    }

    @Get()
    async allAdventures(): Promise<string> {
        const adventures = await this.adventureService.findAll();
        return JSON.stringify(adventures);
    }

    @Post()
    async createAdventure(@BodyParams() adventureData: adventureData): Promise<string> {
        const adventureModel = this.adventureService.create(adventureData);
        return ''
    }

    @Put()
    async updateAdventure(@BodyParams() adventureData: adventureData): Promise<string> {
        return ''
    }
}