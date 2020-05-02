import {Service} from "@tsed/di";
import {DND5TalentModel} from "../../model/dnd5/DND5TalentModel";

@Service()
export class DND5TalentRepository {

    create = async(dnd5TalentModel: DND5TalentModel): Promise<DND5TalentModel> => {

    }

    bulkCreate = async(dnd5TalentModels: DND5TalentModel[]): Promise<DND5TalentModel[]> => {

    }

    delete = async(id: string): Promise<boolean> => {

    }

    update = async(dnd5TalentModel: DND5TalentModel): Promise<DND5TalentModel> => {

    }

    findOneBy = async(key, value): Promise<DND5TalentModel> => {

    }

    findAll = async(): Promise<DND5TalentModel[]> => {

    }
}