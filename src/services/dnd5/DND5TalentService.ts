import {Service} from "@tsed/di";
import {DND5TalentModel} from "../../model/dnd5/DND5TalentModel";
import {DND5TalentForm} from "../../validation/dnd5/DND5TalentForm";
import {DND5TalentRepository} from "../../repositories/dnd5/DND5TalentRepository";
import {DND5TalentDataToModelMapper} from "../../mapping/fromDataToModel/dnd5/DND5TalentDataToModelMapper";
import {DataValidationException} from "../../exception/DataValidationException";

@Service()
export class DND5TalentService {
    private dnd5TalentForm: DND5TalentForm;
    private dnd5TalentRepository: DND5TalentRepository;
    private dnd5TalentDataToModelMapper: DND5TalentDataToModelMapper;

    constructor(
        dnd5TalentForm: DND5TalentForm,
        dnd5TalentRepository: DND5TalentRepository,
        dnd5TalentDataToModelMapper: DND5TalentDataToModelMapper
    ) {
        this.dnd5TalentForm = dnd5TalentForm;
        this.dnd5TalentRepository = dnd5TalentRepository;
        this.dnd5TalentDataToModelMapper = dnd5TalentDataToModelMapper;
    }

    create = async(talentData): Promise<DND5TalentModel> => {
        const validateData = this.dnd5TalentForm.validate(talentData);
        if (validateData) {
            const talentModel = this.dnd5TalentDataToModelMapper.map(talentData);
            return this.dnd5TalentRepository.create(talentModel);
        } else {
            throw new DataValidationException('DND5 Talent could not be created. Data is not valid')
        }
    }

    bulkCreate = async(talentDataArray): Promise<DND5TalentModel[]> => {
        const viewModels = talentDataArray.map(talentDataEntry => {
            const validateData = this.dnd5TalentForm.validate(talentDataEntry);
            if (validateData) {
                return this.dnd5TalentDataToModelMapper.map(talentDataEntry);
            } else {
                throw new DataValidationException('DND5 Talent could not be created. Data is not valid')
            }
        })
        return this.dnd5TalentRepository.bulkCreate(viewModels)
    }

    delete = async(id: string): Promise<boolean> => {
        return this.dnd5TalentRepository.delete(id);
    }

    update = async(talentData): Promise<DND5TalentModel> => {
        const validateData = this.dnd5TalentForm.validate(talentData);
        if (validateData) {
            const talentModel = this.dnd5TalentDataToModelMapper.map(talentData);
            return this.dnd5TalentRepository.update(talentModel);
        } else {
            throw new DataValidationException('DND5 Talent could not be updated. Data is not valid')
        }
    }

    findOneBy = async(key, value): Promise<DND5TalentModel> => {
        return this.dnd5TalentRepository.findOneBy(key, value);
    }

    findAll = async(): Promise<DND5TalentModel[]> => {
        return this.dnd5TalentRepository.findAll();
    }
}