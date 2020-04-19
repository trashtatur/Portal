import {EntityToModelMapperInterface} from "../EntityToModelMapperInterface";
import {Adventure} from "../../db/schemas/Adventure";
import {AdventureModel} from "../../model/AdventureModel";
import {Service} from "@tsed/di";
import {SceneEntityToModelMapper} from "./SceneEntityToModelMapper";

@Service()
export class AdventureEntityToModelMapper implements EntityToModelMapperInterface{
    private sceneEntityToModelMapper: SceneEntityToModelMapper;

    constructor(sceneEntityToModelMapper: SceneEntityToModelMapper) {
        this.sceneEntityToModelMapper = sceneEntityToModelMapper;
    }

    map(entity: Adventure): AdventureModel {

        let sceneModels = [];
        if (entity.scenes !== undefined) {
            sceneModels = entity.scenes.map(sceneEntity => {
                return this.sceneEntityToModelMapper.map(sceneEntity);
            });
        }
        return new AdventureModel(
            entity.uuid,
            entity.name,
            entity.core,
            sceneModels
        )
    }
}