import {DataToModelMapperInterface} from "../DataToModelMapperInterface";
import {AdventureModel} from "../../model/AdventureModel";

export class AdventureDataToModelMapper implements DataToModelMapperInterface<AdventureModel>{

    map(data): AdventureModel {
        return new AdventureModel(
            data._id,
            data._name,
            data._core,
            null
        )
    }

    mapMultiple(data): AdventureModel[] {
        return [];
    }
}