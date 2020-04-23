import {EntityToModelMapperInterface} from "../EntityToModelMapperInterface";
import {Action} from "../../db/schemas/Action";
import {ActionModel} from "../../model/ActionModel";
import {RangeTypeEnum} from "../../model/enumeration/RangeTypeEnum";
import {DamageType} from "../../model/dataModel/DamageType";

export class ActionEntityToModelMapper implements EntityToModelMapperInterface{
    map(entity: Action): ActionModel {
        return null; //TODO
    }
}