import {EntityToModelMapperInterface} from "../EntityToModelMapperInterface";
import {Scene} from "../../db/schemas/Scene";
import {SceneModel} from "../../model/SceneModel";
import {Service} from "@tsed/di";
import {PersonEntityToModelMapper} from "./PersonEntityToModelMapper";

@Service()
export class SceneEntityToModelMapper implements EntityToModelMapperInterface{
    private personEntityToModelMapper: PersonEntityToModelMapper;

    constructor(personEntityToModelMapper: PersonEntityToModelMapper) {
        this.personEntityToModelMapper = personEntityToModelMapper;
    }

    map(entity: Scene): SceneModel {

        let personModels = [];
        if (entity.persons !== undefined) {
            personModels = entity.persons.map(person => {
                return this.personEntityToModelMapper.map(person);
            })
        }
        return new SceneModel(
            entity.uuid,
            entity.adventureId,
            entity.number,
            entity.name,
            entity.hook,
            entity.token,
            entity.act,
            entity.resolve,
            [],
            entity.additionalDescription,
            entity.images.split(','),
            entity.treasure,
            personModels
        )
    }
}