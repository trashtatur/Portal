import {Service} from "@tsed/di";
import {DND5SkillModel} from "../../model/dnd5/DND5SkillModel";
import {DND5SkillForm} from "../../validation/dnd5/DND5SkillForm";
import {DND5SkillRepository} from "../../repositories/dnd5/DND5SkillRepository";
import {DataValidationException} from "../../exception/DataValidationException";
import {deserialize} from "typescript-json-serializer";

@Service()
export class DND5SkillService {
    private dnd5SkillForm: DND5SkillForm;
    private dnd5SkillRepository: DND5SkillRepository;

    constructor(
        dnD5SkillForm: DND5SkillForm,
        dnD5SkillRepository: DND5SkillRepository,
    ) {
        this.dnd5SkillForm = dnD5SkillForm;
        this.dnd5SkillRepository = dnD5SkillRepository;
    }

    create = async (skillData): Promise<DND5SkillModel> => {
        const validateData = this.dnd5SkillForm.validate(skillData);
        if (validateData) {
            const skillModel = deserialize(validateData, DND5SkillModel);
            return this.dnd5SkillRepository.create(skillModel)
        } else {
            throw new DataValidationException('DND5 Skill could not be created. Data is not valid')
        }
    }

    bulkCreate = async (skillDataArray): Promise<DND5SkillModel[]> => {
        const viewModels = skillDataArray.forEach(skillDataEntry => {
            const validateData = this.dnd5SkillForm.validate(skillDataEntry);
            if (validateData) {
                return deserialize(validateData, DND5SkillModel);
            } else {
                throw new DataValidationException('DND5 Skill could not be created. Data is not valid')
            }
        })
        return this.dnd5SkillRepository.bulkCreate(viewModels)
    }

    delete = async (id: string): Promise<boolean> => {
        return this.dnd5SkillRepository.delete(id);
    }

    update = async (skillData): Promise<DND5SkillModel> => {
        const validateData = this.dnd5SkillForm.validate(skillData);
        if (validateData) {
            const skillModel = deserialize(validateData, DND5SkillModel);
            return this.dnd5SkillRepository.update(skillModel)
        } else {
            throw new DataValidationException('DND5 Skill could not be updated. Data is not valid')
        }
    }

    findOneBy = async (key, value): Promise<DND5SkillModel> => {
        return this.dnd5SkillRepository.findOneBy(key, value);
    }

    findAll = async (): Promise<DND5SkillModel[]> => {
        return this.dnd5SkillRepository.findAll();
    }
}