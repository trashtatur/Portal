import {Controller, Get} from "@tsed/common";
import {LanguageService} from "./Services/LanguageService";
import {Language} from "../../db/schemas/Language";
import {Talent} from "../../db/schemas/Talent";
import {Skill} from "../../db/schemas/Skill";
import {Sense} from "../../db/schemas/Sense";
import {Action} from "../../db/schemas/Action";

@Controller('/language')
export class LanguageResourceController {

    constructor(private readonly languageService: LanguageService) {

    }

    @Get()
    async allLanguages(): Promise<string> {
        let languages = await this.languageService.findAll([]);
        return JSON.stringify(languages)
    }

}