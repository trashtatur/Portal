import {SceneRepository} from "../repositories/SceneRepository";
import {SceneModel} from "../model/SceneModel";
import {sceneData} from "../types/backendTypes";
import {Service} from "@tsed/di";
import {SceneForm} from "../validation/SceneForm";
import {DataValidationException} from "../exception/DataValidationException";
import {deserialize} from "typescript-json-serializer";

@Service()
export class SceneService {
    private readonly sceneRepository: SceneRepository;
    private readonly sceneForm: SceneForm;

    constructor(
        sceneRepository: SceneRepository,
        sceneForm: SceneForm,
    ) {
        this.sceneForm = sceneForm;
        this.sceneRepository = sceneRepository;
    }

    async create(data: sceneData): Promise<SceneModel> {
        const validatedData = this.sceneForm.validate(data);
        if (validatedData) {
            const sceneModel = deserialize(validatedData, SceneModel);
            return this.sceneRepository.create(
                sceneModel
            )
        } else {
            throw new DataValidationException('Scene could not be created. Data is not valid')
        }
    }
}