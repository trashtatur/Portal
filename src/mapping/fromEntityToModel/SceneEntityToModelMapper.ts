import {EntityToModelMapperInterface} from "../EntityToModelMapperInterface";
import {Scene} from "../../db/schemas/Scene";
import {SceneModel} from "../../model/SceneModel";
import {Service} from "@tsed/di";
import {PersonEntityToModelMapper} from "./PersonEntityToModelMapper";

@Service()
export class SceneEntityToModelMapper implements EntityToModelMapperInterface<Scene, SceneModel>{
    private personEntityToModelMapper: PersonEntityToModelMapper;

    constructor(personEntityToModelMapper: PersonEntityToModelMapper) {
        this.personEntityToModelMapper = personEntityToModelMapper;
    }

    map(entity: Scene): SceneModel {
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
            this.personEntityToModelMapper.mapMultiple(entity.persons)
        )
    }

    mapMultiple(entities?: Scene[]): SceneModel[] | null {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.map(entity);
        });
    }
}