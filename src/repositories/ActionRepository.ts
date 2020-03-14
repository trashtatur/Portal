import {ActionModel} from "../model/ActionModel";
import {Action} from "../db/schemas/Action";
import {EntityCreateException} from "./exception/EntityCreateException";

export class ActionRepository {

    async create(actionModel: ActionModel): Promise<ActionModel> {
        const action = await Action.create(
            {
                name: actionModel.name,
                rangeType: actionModel.rangeType,
                attackBonus: actionModel.attackBonus,
                range: actionModel.range,
                magical: actionModel.damageTypes.isMagic,
                damage: actionModel.damage.getDamageString(),
                critMod: actionModel.critMod,
                damageType: actionModel.damageTypes.getDamageTypesString(),
                additionalInfo: actionModel.additionalInfo
            }
        );
        if (action) {
            return actionModel;
        }
        throw new EntityCreateException(`Action with name ${actionModel.name} could not be created`)
    }
}