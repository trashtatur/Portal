import {Service} from "@tsed/di";
import {DND5SpellModel} from "../../model/dnd5/DND5SpellModel";
import {DND5SpellForm} from "../../validation/dnd5/DND5SpellForm";
import {DND5SpellRepository} from "../../repositories/dnd5/DND5SpellRepository";
import {DND5SpellDataToModelMapper} from "../../mapping/fromDataToModel/dnd5/DND5SpellDataToModelMapper";
import {DataValidationException} from "../../exception/DataValidationException";

@Service()
export class DND5SpellService {
    private dnd5SpellForm: DND5SpellForm;
    private dnd5SpellRepository: DND5SpellRepository;
    private dnd5SpellDataToModelMapper: DND5SpellDataToModelMapper;

    constructor(
        dnd5SpellForm: DND5SpellForm,
        dnd5SpellRepository: DND5SpellRepository,
        dnd5SpellDataToModelMapper: DND5SpellDataToModelMapper
    ) {
        this.dnd5SpellForm = dnd5SpellForm;
        this.dnd5SpellRepository = dnd5SpellRepository;
        this.dnd5SpellDataToModelMapper = dnd5SpellDataToModelMapper;
    }

    create = async(spellData): Promise<DND5SpellModel> => {
        const validatedData = this.dnd5SpellForm.validate(spellData);
        if (validatedData) {
            const spellModel = this.dnd5SpellDataToModelMapper.map(spellData);
            return this.dnd5SpellRepository.create(spellModel);
        } else {
            throw new DataValidationException('DND5 Spell could not be created. Data is not valid')
        }
    }

    bulkCreate = async(spellDataArray: Array<any>): Promise<DND5SpellModel[]> => {
        const viewModels = spellDataArray.map(spellDataEntry => {
            const validatedData = this.dnd5SpellForm.validate(spellDataEntry);
            if (validatedData) {
                return this.dnd5SpellDataToModelMapper.map(spellDataEntry);
            } else {
                throw new DataValidationException('DND5 Spell could not be created. Data is not valid')
            }
        })
        return this.dnd5SpellRepository.bulkCreate(viewModels);
    }

    delete = async(id: string): Promise<boolean> => {
        return this.dnd5SpellRepository.delete(id);
    }

    update = async(spellData): Promise<DND5SpellModel> => {
        const validatedData = this.dnd5SpellForm.validate(spellData);
        if (validatedData) {
            const spellModel = this.dnd5SpellDataToModelMapper.map(spellData);
            return this.dnd5SpellRepository.update(spellModel);
        } else {
            throw new DataValidationException('DND5 Spell could not be created. Data is not valid')
        }
    }

    findOneBy = async(key, value): Promise<DND5SpellModel> => {
        return this.dnd5SpellRepository.findOneBy(key, value);
    }

    findAll = async(): Promise<DND5SpellModel[]> => {
        return this.dnd5SpellRepository.findAll();
    }
}