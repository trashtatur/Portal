import {Service} from "@tsed/di";
import {DND5ActionModel} from "../../model/dnd5/DND5ActionModel";

@Service()
export class DND5ActionRepository {

    create = async(dnd5ActionModel: DND5ActionModel): Promise<DND5ActionModel> => {
        return null;
    }

    bulkCreate = async(dnd5ActionModels: DND5ActionModel[]): Promise<DND5ActionModel[]> => {
        return null;
    }

    delete = async(id: string): Promise<boolean> => {
        return null;
    }

    update = async(dnD5ActionModel: DND5ActionModel): Promise<DND5ActionModel> => {
        return null;
    }

    findOneBy = async(key, value): Promise<DND5ActionModel> => {
        return null;
    }

    findAll = async(): Promise<DND5ActionModel[]> => {
        return null;
    }
}