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

        let childSceneModels = [];
        if (entity.childScenes !== undefined) {
            let personModels = [];
            if (entity.persons !== undefined) {
                personModels = entity.persons.map(person => {
                    return this.personEntityToModelMapper.map(person);
                })
            }
            childSceneModels = entity.childScenes.map(sceneEntity => {
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
                    sceneEntity.images.split(','),
                    sceneEntity.treasure,
                    personModels
                )
            });
        }
        let parentSceneModels = [];
        if (entity.parentScenes !== undefined) {
            let personModels = [];
            if (entity.persons !== undefined) {
                personModels = entity.persons.map(person => {
                    return this.personEntityToModelMapper.map(person);
                })
            }
            parentSceneModels = entity.parentScenes.map(sceneEntity => {
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
                    sceneEntity.images.split(','),
                    sceneEntity.treasure,
                    personModels
                )
            });
        }
        let personModels = [];
        if (entity.persons !== undefined) {
            personModels = entity.persons.map(person => {
                return this.personEntityToModelMapper.map(person);
            })
        }
        return new SceneModel(
            entity.id,
            entity.number,
            entity.name,
            entity.hook,
            entity.token,
            entity.act,
            entity.resolve,
            childSceneModels,
            parentSceneModels,
            entity.additionalDescription,
            entity.images.split(','),
            entity.treasure,
            personModels
        )
    }
}