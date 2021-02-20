import {Service} from "@tsed/di";
import {DND5TalentModel} from "../../model/dnd5/DND5TalentModel";

@Service()
export class DND5TalentRepository {

    create = async(dnd5TalentModel: DND5TalentModel): Promise<DND5TalentModel> => {
        return null;
    }

    bulkCreate = async(dnd5TalentModels: DND5TalentModel[]): Promise<DND5TalentModel[]> => {
        return null;
    }

    delete = async(id: string): Promise<boolean> => {
        return null;
    }

    update = async(dnd5TalentModel: DND5TalentModel): Promise<DND5TalentModel> => {
        return null;
    }

    findOneBy = async(key, value): Promise<DND5TalentModel> => {
        return null;
    }

    findAll = async(): Promise<DND5TalentModel[]> => {
        return null;
    }
}