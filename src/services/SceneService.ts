import {SceneRepository} from "../repositories/SceneRepository";
import {SceneModel} from "../model/SceneModel";
import {sceneData} from "../types/backendTypes";
import {Service} from "@tsed/di";
import {deserialize} from "typescript-json-serializer";

@Service()
export class SceneService {
    private readonly sceneRepository: SceneRepository;

    constructor(
        sceneRepository: SceneRepository,
    ) {
        this.sceneRepository = sceneRepository;
    }

    async create(data: sceneData): Promise<SceneModel> {
        const sceneModel = deserialize(data, SceneModel);
        return this.sceneRepository.create(
            sceneModel
        )
    }
}