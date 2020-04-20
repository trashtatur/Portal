import {AdventureRepository} from "../repositories/AdventureRepository";
import {AdventureModel} from "../model/AdventureModel";
import {adventureData} from "../types/backendTypes";
import {AdventureForm} from "../validation/AdventureForm";
import {AdventureModelMapper} from "../mapping/fromDataToModel/AdventureModelMapper";
import {Service} from "@tsed/di";
import {AdventureEntityToModelMapper} from "../mapping/fromEntityToModel/AdventureEntityToModelMapper";

@Service()
export class AdventureService {
    private readonly adventureRepository: AdventureRepository;
    private adventureDataToModelMapper: AdventureModelMapper;
    private adventureEntityToModelMapper: AdventureEntityToModelMapper;

    constructor(
        adventureRepository: AdventureRepository,
        adventureDataToModelMapper: AdventureModelMapper,
        adventureEntityToModelMapper: AdventureEntityToModelMapper
    ) {
        this.adventureRepository = adventureRepository;
        this.adventureDataToModelMapper = adventureDataToModelMapper;
        this.adventureEntityToModelMapper = adventureEntityToModelMapper
    }

    async create(data: adventureData): Promise<AdventureModel> {
        const adventureFormValidator = new AdventureForm();
        const validatedData = adventureFormValidator.validate(data);
        if (validatedData) {
            const adventureEntity= await this.adventureRepository.create(
                this.adventureDataToModelMapper.map(data)
            );
            return this.adventureEntityToModelMapper.map(adventureEntity)
        }
        return null
    }

    async findOneBy(key, value): Promise<AdventureModel> {
        const adventureEntity = await this.adventureRepository.findOneBy(key, value);
        return this.adventureEntityToModelMapper.map(adventureEntity);
    }

    async findAll(): Promise<AdventureModel[]> {
        const adventureEntities = await this.adventureRepository.findAll();
        return adventureEntities.map(adventureEntity => {
            return this.adventureEntityToModelMapper.map(adventureEntity)
        })
    }
}