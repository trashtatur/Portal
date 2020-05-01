import {Service} from "@tsed/di";
import {DND5ActionModel} from "../../model/dnd5/DND5ActionModel";

@Service()
export class DND5ActionService {

    create = async(actionData): Promise<DND5ActionModel> => {

    }

    bulkCreate = async(actionDataArray): Promise<DND5ActionModel[]> => {

    }

    delete = async(id: string): Promise<boolean> => {

    }

    update = async(actionData): Promise<DND5ActionModel> => {

    }

    findOneBy = async(key, value): Promise<DND5ActionModel> => {

    }

    findAll = async(): Promise<DND5ActionModel[]> => {

    }
}