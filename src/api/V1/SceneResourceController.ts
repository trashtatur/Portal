import {BodyParams, Controller, Get, PathParams, Post, Put} from "@tsed/common";
import {SceneService} from "../../services/SceneService";
import {sceneData} from "../../types/backendTypes";


@Controller('/Scene')
export class SceneResourceController {
    private readonly sceneService: SceneService;

    constructor(sceneService: SceneService) {
        this.sceneService = sceneService;
    }

    @Get('/id/:adventureId')
    async sceneById(@PathParams('sceneId') sceneId: number): Promise<string> {
        return ''
    }

    @Get()
    async allScenes(): Promise<string> {
        return ''
    }

    @Post()
    async createScene(@BodyParams() sceneData: sceneData): Promise<string> {
        const sceneModel = this.sceneService.create(sceneData);
        return ''
    }

    @Put()
    async updateScene(@BodyParams() sceneData: sceneData): Promise<string> {
        return ''
    }
}