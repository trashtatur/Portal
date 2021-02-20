import {SceneModel} from "../model/SceneModel";
import {Scene} from "../db/schemas/Scene";
import {Adventure} from "../db/schemas/Adventure";
import {Person} from "../db/schemas/Person";
import {Service} from "@tsed/di";
import {SceneConverter} from "../converter/SceneConverter";

@Service()
export class SceneRepository {
    private readonly sceneConverter: SceneConverter;

    constructor(
        sceneConverter: SceneConverter
    ) {
        this.sceneConverter = sceneConverter;
    }

    create = async (sceneModel: SceneModel): Promise<SceneModel> => {
        let sceneEntity = await this.buildSceneBase(sceneModel);
        sceneEntity = await this.includeProvidedRelationsIntoScene(sceneEntity, sceneModel);
        sceneEntity = await sceneEntity.save();
        return this.sceneConverter.convertEntity(sceneEntity);
    }

    private includeProvidedRelationsIntoScene = async (scene: Scene, sceneModel: SceneModel): Promise<Scene> => {
        let sceneEntity = await this.includeAdventure(sceneModel, scene);
        if (sceneModel.persons !== null && sceneModel.persons.length !== 0) {
            sceneEntity = await this.includePersons( sceneModel, sceneEntity)
        }
        return sceneEntity;
    }

    private includeParentScenes = (sceneModel: SceneModel): string | null => {
        if (sceneModel.parentScenes === null) {
            return null;
        }
        const parentSceneIds = sceneModel.parentScenes.map(scene => {return scene.id});
        return parentSceneIds.join(',')
    }

    private includeAdventure = async(sceneModel: SceneModel, sceneEntity: Scene): Promise<Scene> =>{
        const adventure = await Adventure.findOne({where: {uuid: sceneModel.adventureId}});
        await adventure.$add('scene', sceneEntity);
        return sceneEntity
    }

    private includePersons = async(sceneModel: SceneModel, sceneEntity: Scene): Promise<Scene> =>{
        const personIds = sceneModel.persons.map(person => {return person.id});
        const persons = await Person.findAll({where: { uuid: personIds}});
        persons.forEach(person =>  {
            sceneEntity.$add('person', person);
        })
        return sceneEntity;
    }

    private buildSceneBase = (sceneModel: SceneModel): Promise<Scene> => {
        return Scene.create(
            {
                adventureId: sceneModel.adventureId,
                number: sceneModel.number,
                name: sceneModel.name,
                hook: sceneModel.hook,
                token: sceneModel.token,
                treasure: sceneModel.treasure,
                act: sceneModel.act,
                images: sceneModel.images.join(','),
                parentScenes: this.includeParentScenes(sceneModel),
                additionalDescription: sceneModel.additionalDescription,
                resolve: sceneModel.resolve,
            }
        )
    }
}