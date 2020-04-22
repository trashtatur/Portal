import {AdventureModel} from "../model/AdventureModel";
import {Adventure} from "../db/schemas/Adventure";
import {Service} from "@tsed/di";
import {AdventureEntityToModelMapper} from "../mapping/fromEntityToModel/AdventureEntityToModelMapper";
import {Scene} from "../db/schemas/Scene";
import {Person} from "../db/schemas/Person";
import {SceneModel} from "../model/SceneModel";
import {SceneEntityToModelMapper} from "../mapping/fromEntityToModel/SceneEntityToModelMapper";

@Service()
export class AdventureRepository {
    private readonly adventureEntityToModelMapper: AdventureEntityToModelMapper;
    private sceneEntityToModelMapper: SceneEntityToModelMapper;

    constructor(
        adventureEntityToModelMapper: AdventureEntityToModelMapper,
        sceneEntityToModelMapper: SceneEntityToModelMapper
    ) {
        this.adventureEntityToModelMapper = adventureEntityToModelMapper;
        this.sceneEntityToModelMapper = sceneEntityToModelMapper;
    }

    async create(adventureModel: AdventureModel): Promise<AdventureModel> {
        const adventure: Adventure = await Adventure.create(
            {
                name: adventureModel.name,
                core: adventureModel.core
            }
        );
        return this.adventureEntityToModelMapper.map(adventure);
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
        const adventureModel = this.adventureEntityToModelMapper.map(adventure);
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
            return this.adventureEntityToModelMapper.map(adventureEntity)
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
            return this.sceneEntityToModelMapper.map(sceneEntity)
        })
    }
}