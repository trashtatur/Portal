import {Service} from "@tsed/di";
import {DND5TalentModel} from "../../model/dnd5/DND5TalentModel";

@Service()
export class DND5TalentService {

    create = async(talentData): Promise<DND5TalentModel> => {

    }

    bulkCreate = async(talentDataArray): Promise<DND5TalentModel[]> => {

    }

    delete = async(id: string): Promise<boolean> => {

    }

    update = async(talentData): Promise<DND5TalentModel> => {

    }

    findOneBy = async(key, value): Promise<DND5TalentModel> => {

    }

    findAll = async(): Promise<DND5TalentModel[]> => {

    }
}