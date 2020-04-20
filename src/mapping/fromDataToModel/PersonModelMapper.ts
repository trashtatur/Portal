import {DataToModelMapperInterface} from "../ModelToEntityMapperInterface";
import {PersonModel} from "../../model/PersonModel";

export class PersonModelMapper implements DataToModelMapperInterface{

    map(data): PersonModel {
        return new PersonModel(
            data._id,
            data._name,
            data._type,
            data._needs,
            data._desires,
            data._weaknesses,
            data._enemies,
            data._image,
            data._customFields,
            data._additionalDescription,
            [],
            []
        )
    }
}