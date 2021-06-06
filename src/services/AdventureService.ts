import {AdventureRepository} from "../repositories/AdventureRepository";
import {AdventureModel} from "../model/AdventureModel";
import {adventureData} from "../types/backendTypes";
import {Service} from "@tsed/di";
import {AdventureConverter} from "../converter/AdventureConverter";
import {DataValidationException} from "../exception/DataValidationException";
import {deserialize} from "typescript-json-serializer";

@Service()
export class AdventureService {
    private adventureRepository: AdventureRepository;
    private adventureEntityToModelMapper: AdventureConverter;

    constructor(
        adventureRepository: AdventureRepository,
        adventureEntityToModelMapper: AdventureConverter
    ) {
        this.adventureRepository = adventureRepository;
        this.adventureEntityToModelMapper = adventureEntityToModelMapper
    }

    async create(data: adventureData): Promise<AdventureModel> {
        return await this.adventureRepository.create(
            deserialize(data, AdventureModel)
        )
    }

    async findOneBy(key, value): Promise<AdventureModel> {
        return this.adventureRepository.findOneBy(key, value);
    }

    async findAll(): Promise<AdventureModel[]> {
        return this.adventureRepository.findAll()
    }
}