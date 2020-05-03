import {Service} from "@tsed/di";
import {DND5LanguageModel} from "../../model/dnd5/DND5LanguageModel";

@Service()
export class DND5LanguageRepository {

    create = async(dnd5LanguageModel: DND5LanguageModel): Promise<DND5LanguageModel> => {
        return null;
    }

    bulkCreate = async(dnd5Languagemodels: DND5LanguageModel[]): Promise<DND5LanguageModel[]> => {
        return null;
    }

    delete = async(id: string): Promise<boolean> => {
        return null;
    }

    update = async(dnd5Language: DND5LanguageModel): Promise<DND5LanguageModel> => {
        return null;
    }

    findOneBy = async(key, value): Promise<DND5LanguageModel> => {
        return null;
    }

    findAll = async(): Promise<DND5LanguageModel[]> => {
        return null;
    }
}