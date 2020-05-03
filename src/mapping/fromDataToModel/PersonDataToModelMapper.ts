import {DataToModelMapperInterface} from "../DataToModelMapperInterface";
import {PersonModel} from "../../model/PersonModel";

export class PersonDataToModelMapper implements DataToModelMapperInterface<PersonModel>{

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