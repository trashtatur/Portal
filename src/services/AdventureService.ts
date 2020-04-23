import {AdventureRepository} from "../repositories/AdventureRepository";
import {AdventureModel} from "../model/AdventureModel";
import {adventureData} from "../types/backendTypes";
import {AdventureForm} from "../validation/AdventureForm";
import {AdventureDataToModelMapper} from "../mapping/fromDataToModel/AdventureDataToModelMapper";
import {Service} from "@tsed/di";
import {AdventureEntityToModelMapper} from "../mapping/fromEntityToModel/AdventureEntityToModelMapper";
import {DataValidationException} from "../exception/DataValidationException";

@Service()
export class AdventureService {
    private readonly adventureRepository: AdventureRepository;
    private adventureForm: AdventureForm;
    private adventureDataToModelMapper: AdventureDataToModelMapper;
    private adventureEntityToModelMapper: AdventureEntityToModelMapper;

    constructor(
        adventureRepository: AdventureRepository,
        adventureForm: AdventureForm,
        adventureDataToModelMapper: AdventureDataToModelMapper,
        adventureEntityToModelMapper: AdventureEntityToModelMapper
    ) {
        this.adventureRepository = adventureRepository;
        this.adventureForm = adventureForm;
        this.adventureDataToModelMapper = adventureDataToModelMapper;
        this.adventureEntityToModelMapper = adventureEntityToModelMapper
    }

    async create(data: adventureData): Promise<AdventureModel> {
        const validatedData = this.adventureForm.validate(data);
        if (validatedData) {
            return await this.adventureRepository.create(
                this.adventureDataToModelMapper.map(data)
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