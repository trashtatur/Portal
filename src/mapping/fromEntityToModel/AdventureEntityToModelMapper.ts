import {EntityToModelMapperInterface} from "../EntityToModelMapperInterface";
import {Adventure} from "../../db/schemas/Adventure";
import {AdventureModel} from "../../model/AdventureModel";
import {Service} from "@tsed/di";
import {SceneEntityToModelMapper} from "./SceneEntityToModelMapper";
import {PersonEntityToModelMapper} from "./PersonEntityToModelMapper";

@Service()
export class AdventureEntityToModelMapper implements EntityToModelMapperInterface<Adventure, AdventureModel>{
    private sceneEntityToModelMapper: SceneEntityToModelMapper;
    private personEntityToModelMapper: PersonEntityToModelMapper;

    constructor(
        sceneEntityToModelMapper: SceneEntityToModelMapper,
        personEntityToModelMapper: PersonEntityToModelMapper
    ) {
        this.personEntityToModelMapper = personEntityToModelMapper;
        this.sceneEntityToModelMapper = sceneEntityToModelMapper;
    }

    map(entity: Adventure): AdventureModel {

        let sceneModels = [];
        if (entity.scenes !== undefined) {
            sceneModels = entity.scenes.map(sceneEntity => {
                return this.sceneEntityToModelMapper.map(sceneEntity);
            });
        }
        let personModels = [];
        if (entity.persons !== undefined) {
            personModels = entity.persons.map(person => {
                return this.personEntityToModelMapper.map(person);
            })
        }
        return new AdventureModel(
            entity.uuid,
            entity.name,
            entity.core,
            sceneModels,
            personModels
        )
    }

    mapMultiple(entities?: Adventure[]): AdventureModel[] | null {
        if (!entities) {
            return null;
        }
        return entities.map(entity => {
            return this.map(entity);
        });
    }
}