import {AdventureModel} from "../model/AdventureModel";
import {Adventure} from "../db/schemas/Adventure";
import {Service} from "@tsed/di";
import {AdventureConverter} from "../converter/AdventureConverter";
import {Scene} from "../db/schemas/Scene";
import {Person} from "../db/schemas/Person";
import {SceneModel} from "../model/SceneModel";
import {SceneConverter} from "../converter/SceneConverter";

@Service()
export class AdventureRepository {
    private readonly adventureConverter: AdventureConverter;
    private sceneConverter: SceneConverter;

    constructor(
        adventureConverter: AdventureConverter,
        sceneConverter: SceneConverter
    ) {
        this.adventureConverter = adventureConverter;
        this.sceneConverter = sceneConverter;
    }

    async create(adventureModel: AdventureModel): Promise<AdventureModel> {
        const adventure: Adventure = await Adventure.create(
            {
                name: adventureModel.name,
                core: adventureModel.core
            }
        );
        return this.adventureConverter.convertEntity(adventure);
    }

    async findOneBy(key, value): Promise<AdventureModel> {
        const condition = {};
        condition[key] = value;
        const adventure = await Adventure.findOne(
            {
                where: condition, include: [
                    {
                        model: Scene,
                    },
                    Person
                ]
            });
        const adventureModel = this.adventureConverter.convertEntity(adventure);
        if (adventureModel.scenes !== null) {
            for(const scene of adventureModel.scenes) {
                scene.parentScenes = await this.getParentScenesForScene(scene, adventure.scenes)
            }
        }
        return adventureModel;
    }

    async findAll(): Promise<AdventureModel[]> {
        const adventures = await Adventure.findAll();
        return adventures.map(adventureEntity => {
            return this.adventureConverter.convertEntity(adventureEntity)
        })
    }

    async delete(): Promise<void> {

    }

    async update(adventureModel: AdventureModel): Promise<AdventureModel> {
        return null
    }

    private getParentScenesForScene = async (sceneModel: SceneModel, sceneEntities: Scene[]): Promise<SceneModel[]> => {
        const matchingEntity = sceneEntities.find(scene => {
            if (scene.uuid === sceneModel.id) {
                return scene;
            }
        })
        if (!matchingEntity) {
            return []
        }
        const parentSceneIds = matchingEntity.parentScenes.split(',');
        const parentSceneEntities = await Scene.findAll({where: {uuid: parentSceneIds}})
        return parentSceneEntities.map(sceneEntity => {
            return this.sceneConverter.convertEntity(sceneEntity)
        })
    }
}