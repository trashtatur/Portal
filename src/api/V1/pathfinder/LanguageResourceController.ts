import {BodyParams, Controller, Get, Post} from "@tsed/common";
import {PathfinderLanguageService} from "../../../services/pathfinder/PathfinderLanguageService";

@Controller('/Pathfinder/language')
export class LanguageResourceController {
    private pathfinderLanguageService: PathfinderLanguageService;

    constructor(
        pathfinderLanguageService: PathfinderLanguageService
    ) {
        this.pathfinderLanguageService = pathfinderLanguageService;
    }

    @Get()
    async allLanguages(): Promise<string> {
        const languages = await this.pathfinderLanguageService.findAll();
        return JSON.stringify(languages)
    }

    @Post()
    async createLanguage(@BodyParams() languageData): Promise<string> {
        const language = await this.pathfinderLanguageService.create(languageData);
        return JSON.stringify(language)
    }

}