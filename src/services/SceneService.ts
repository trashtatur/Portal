import {SceneRepository} from "../repositories/SceneRepository";
import {SceneModel} from "../model/SceneModel";
import {sceneData} from "../types/backendTypes";
import {Service} from "@tsed/di";
import {SceneForm} from "../validation/SceneForm";
import {DataValidationException} from "../exception/DataValidationException";
import {SceneDataToModelMapper} from "../mapping/fromDataToModel/SceneDataToModelMapper";

@Service()
export class SceneService {
    private readonly sceneRepository: SceneRepository;
    private readonly sceneForm: SceneForm;
    private readonly sceneDataToModelMapper: SceneDataToModelMapper;

    constructor(
        sceneRepository: SceneRepository,
        sceneForm: SceneForm,
        sceneDataToModelMapper: SceneDataToModelMapper
    ) {
        this.sceneForm = sceneForm;
        this.sceneRepository = sceneRepository;
        this.sceneDataToModelMapper = sceneDataToModelMapper;
    }

    async create(data: sceneData): Promise<SceneModel> {
        const validatedData = this.sceneForm.validate(data);
        if (validatedData) {
            const sceneModel = this.sceneRepository.create(
                this.sceneDataToModelMapper.map(data)
            )
            return sceneModel
        } else {
            throw new DataValidationException('Scene could not be created. Data is not valid')
        }
    }
}