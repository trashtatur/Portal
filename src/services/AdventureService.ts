import {AdventureRepository} from "../repositories/AdventureRepository";
import {AdventureModel} from "../model/AdventureModel";
import {adventureData} from "../types/backendTypes";
import {AdventureForm} from "../validation/AdventureForm";
import {Service} from "@tsed/di";
import {AdventureConverter} from "../converter/AdventureConverter";
import {DataValidationException} from "../exception/DataValidationException";
import {deserialize} from "typescript-json-serializer";

@Service()
export class AdventureService {
    private adventureRepository: AdventureRepository;
    private adventureForm: AdventureForm;
    private adventureEntityToModelMapper: AdventureConverter;

    constructor(
        adventureRepository: AdventureRepository,
        adventureForm: AdventureForm,
        adventureEntityToModelMapper: AdventureConverter
    ) {
        this.adventureRepository = adventureRepository;
        this.adventureForm = adventureForm;
        this.adventureEntityToModelMapper = adventureEntityToModelMapper
    }

    async create(data: adventureData): Promise<AdventureModel> {
        const validatedData = this.adventureForm.validate(data);
        if (validatedData) {
            return await this.adventureRepository.create(
                deserialize(validatedData, AdventureModel)
            )
        } else {
            throw new DataValidationException('Adventure could not be created. Data is not valid')
        }
    }

    async findOneBy(key, value): Promise<AdventureModel> {
        return this.adventureRepository.findOneBy(key, value);
    }

    async findAll(): Promise<AdventureModel[]> {
        return this.adventureRepository.findAll()
    }
}