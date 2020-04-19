import {EntityToModelMapperInterface} from "../EntityToModelMapperInterface";
import {Scene} from "../../db/schemas/Scene";
import {SceneModel} from "../../model/SceneModel";

export class SceneEntityToModelMapper implements EntityToModelMapperInterface{
    map(entity: Scene): SceneModel {

        const childSceneModels = entity.childScenes.map(sceneEntity => {
            return new SceneModel(
                sceneEntity.id,
                sceneEntity.number,
                sceneEntity.name,
                sceneEntity.hook,
                sceneEntity.token,
                sceneEntity.act,sceneEntity.resolve,
                null,
                null,
                sceneEntity.additionalDescription,
                sceneEntity.images.split(',')
            )
        });

        const parentSceneModel = entity.parentScenes.map(sceneEntity => {
            return new SceneModel(
                sceneEntity.id,
                sceneEntity.number,
                sceneEntity.name,
                sceneEntity.hook,
                sceneEntity.token,
                sceneEntity.act,sceneEntity.resolve,
                null,
                null,
                sceneEntity.additionalDescription,
                sceneEntity.images.split(',')
            )
        });

        return new SceneModel(
            entity.id,
            entity.number,
            entity.name,
            entity.hook,
            entity.token,
            entity.act,
            entity.resolve,
            childSceneModels,
            parentSceneModel,
            entity.additionalDescription,
            entity.images.split(',')
        )
    }
}