import {Controller} from "@tsed/common";
import {LanguageService} from "./Services/LanguageService";

@Controller('/language')
class LanguageResourceController {

    constructor(private readonly languageService: LanguageService) {

    }

}