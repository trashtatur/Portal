import {Service} from "@tsed/di";
import {DND5LanguageModel} from "../../model/dnd5/DND5LanguageModel";
import {DND5LanguageForm} from "../../validation/dnd5/DND5LanguageForm";
import {DND5LanguageRepository} from "../../repositories/dnd5/DND5LanguageRepository";
import {DataValidationException} from "../../exception/DataValidationException";
import {deserialize} from "typescript-json-serializer";

@Service()
export class DND5LanguageService {
    private dnd5LanguageForm: DND5LanguageForm;
    private dnD5LanguageRepository: DND5LanguageRepository;

    constructor(
        dnd5LanguageForm: DND5LanguageForm,
        dnd5LanguageRepository: DND5LanguageRepository,
    ) {
        this.dnd5LanguageForm = dnd5LanguageForm;
        this.dnD5LanguageRepository = dnd5LanguageRepository;
    }

    create = async (languageData): Promise<DND5LanguageModel> => {
        const validatedData = this.dnd5LanguageForm.validate(languageData);
        if (validatedData) {
            const languageModel = deserialize(validatedData, DND5LanguageModel);
            return this.dnD5LanguageRepository.create(languageModel);
        } else {
            throw new DataValidationException('DND5 Language could not be created. Data is not valid')
        }
    }

    bulkCreate = async (languageDataArray: Array<any>): Promise<DND5LanguageModel[]> => {
        const viewModels = languageDataArray.map(languageDataEntry => {
            const validatedData = this.dnd5LanguageForm.validate(languageDataEntry);
            if (validatedData) {
                return deserialize(validatedData, DND5LanguageModel);
            } else {
                throw new DataValidationException('DND5 Language could not be created. Data is not valid')
            }
        })
        return this.dnD5LanguageRepository.bulkCreate(viewModels);
    }

    delete = async (id: string): Promise<boolean> => {
        return this.dnD5LanguageRepository.delete(id);
    }

    update = async (languageData): Promise<DND5LanguageModel> => {
        const validatedData = this.dnd5LanguageForm.validate(languageData);
        if (validatedData) {
            const languageModel = deserialize(validatedData, DND5LanguageModel);
            return this.dnD5LanguageRepository.update(languageModel);
        } else {
            throw new DataValidationException('DND5 Language could not be created. Data is not valid')
        }
    }

    findOneBy = async (key, value): Promise<DND5LanguageModel> => {
        return this.dnD5LanguageRepository.findOneBy(key, value);
    }

    findAll = async (): Promise<DND5LanguageModel[]> => {
        return this.dnD5LanguageRepository.findAll();
    }
}