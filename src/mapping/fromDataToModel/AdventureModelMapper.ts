import {DataToModelMapperInterface} from "../ModelToEntityMapperInterface";
import {AdventureModel} from "../../model/AdventureModel";

export class AdventureModelMapper implements DataToModelMapperInterface{

    map(data): AdventureModel {
        return new AdventureModel(
            data._id,
            data._name,
            data._core,
            null
        )
    }
}