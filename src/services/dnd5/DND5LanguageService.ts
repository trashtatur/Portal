import {Service} from "@tsed/di";
import {DND5LanguageModel} from "../../model/dnd5/DND5LanguageModel";

@Service()
export class DND5LanguageService {

    create = async(languageData): Promise<DND5LanguageModel> => {

    }

    bulkCreate = async(languageDataArray): Promise<DND5LanguageModel[]> => {

    }

    delete = async(id: string): Promise<boolean> => {

    }

    update = async(languageData): Promise<DND5LanguageModel> => {

    }

    findOneBy = async(key, value): Promise<DND5LanguageModel> => {

    }

    findAll = async(): Promise<DND5LanguageModel[]> => {

    }
}