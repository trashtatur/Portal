import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {DND5CreatureProperties} from "../../../db/schemas/DND5/DND5CreatureProperties";
import {DND5CreaturePropertiesModel} from "../../../model/dnd5/DND5CreaturePropertiesModel";

export class DND5CreaturePropertiesEntityToModelMapper implements EntityToModelMapperInterface{
    map(entity: DND5CreatureProperties): DND5CreaturePropertiesModel {
        return null;
    }
}