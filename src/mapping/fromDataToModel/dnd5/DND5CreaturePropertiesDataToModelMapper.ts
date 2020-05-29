import {DataToModelMapperInterface} from "../../DataToModelMapperInterface";
import {DND5CreaturePropertiesModel} from "../../../model/dnd5/DND5CreaturePropertiesModel";

export class DND5CreaturePropertiesDataToModelMapper implements DataToModelMapperInterface<DND5CreaturePropertiesModel>{
    map = (data): DND5CreaturePropertiesModel =>  {
        return undefined;
    }

    mapMultiple = (data): DND5CreaturePropertiesModel[] => {
        return [];
    }
}