import {BodyParams, Controller, Delete, Get, PathParams, Post, Put} from "@tsed/common";
import {DND5LanguageService} from "../../../services/dnd5/DND5LanguageService";

@Controller('/DND5/Language')
export class DND5LanguageResourceController {
    private dnD5LanguageService: DND5LanguageService;

    constructor(
        dnD5LanguageService: DND5LanguageService
    ) {
        this.dnD5LanguageService = dnD5LanguageService;
    }

    @Get()
    async getAllLanguages(): Promise<string> {
        const languages = await this.dnD5LanguageService.findAll();
        return JSON.stringify(languages);
    }

    @Get('id/:languageId')
    async getByLanguageById(@PathParams('languageId') languageId: string): Promise<string>  {
        const language = await this.dnD5LanguageService.findOneBy('uuid', languageId);
        return JSON.stringify(language);
    }

    @Post()
    async createLanguage(@BodyParams('languageData') languageData): Promise<string> {
        const language = await this.dnD5LanguageService.create(languageData);
        return JSON.stringify(language);
    }

    @Put()
    async updateLanguage(@BodyParams('languageData') languageData): Promise<string> {
        const language = await this.dnD5LanguageService.update(languageData);
        return JSON.stringify(language);
    }

    @Delete('/:languageId')
    async deleteLanguage(@PathParams('languageId') languageId: string): Promise<string> {
        const success = await this.dnD5LanguageService.delete(languageId);
        return `{success: ${success}}`
    }
}