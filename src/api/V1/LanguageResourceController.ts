import {BodyParams, Controller, Get, Post} from "@tsed/common";
import {LanguageService} from "../../services/LanguageService";

@Controller('/language')
export class LanguageResourceController {

    constructor(private readonly languageService: LanguageService) {

    }

    @Get()
    async allLanguages(): Promise<string> {
        let languages = await this.languageService.findAll([]);
        return JSON.stringify(languages)
    }

    @Post()
    async createLanguage(@BodyParams() languageData:any[]): Promise<string> {
        let language = await this.languageService.create(languageData);
        return JSON.stringify(language)
    }

}