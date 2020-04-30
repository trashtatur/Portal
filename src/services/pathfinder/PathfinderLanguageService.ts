import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {PathfinderLanguage} from "../../db/schemas/pathfinder/PathfinderLanguage";
import {PathfinderLanguageForm} from "../../validation/pathfinder/PathfinderLanguageForm";
import {PathfinderLanguageModel} from "../../model/pathfinder/PathfinderLanguageModel";
import {PathfinderLanguageRepository} from "../../repositories/pathfinder/PathfinderLanguageRepository";

@Service()
export class PathfinderLanguageService {
    private pathfinderLanguageRepository: PathfinderLanguageRepository;

    constructor(
        pathfinderLanguageRepository: PathfinderLanguageRepository
    ) {
        this.pathfinderLanguageRepository = pathfinderLanguageRepository;
    }

    async create(data, include?: Includeable[]): Promise<PathfinderLanguage[]> {
        const langForm = new PathfinderLanguageForm();
        const valid = langForm.validate(data);
        const langData= data.map(elem=>{return {name: elem.value}});
        return PathfinderLanguage.bulkCreate(langData,{include:include})
    }

    async delete(data: object) {

    }

    async update(data: object, include?: Includeable[]) {

    }

    async findBy(key,value,include?: Includeable[]): Promise<Promise<PathfinderLanguage>[]> {
        const condition = {};
        const langs = [];
        for (const singleVal of value) {
            condition[key]=singleVal;
            const response = await PathfinderLanguage.findOrCreate({where:condition, defaults:{name:singleVal}});
            langs.push(response[0])
        }
        return langs;
    }

    async findOneBy(key,value,include?: Includeable[]) {

    }

    async findAll(): Promise<PathfinderLanguageModel[]> {
        return this.pathfinderLanguageRepository.findAll();
    }
}