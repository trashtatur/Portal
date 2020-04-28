import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {PathfinderLanguage} from "../db/schemas/pathfinder/PathfinderLanguage";
import {LanguageForm} from "../validation/LanguageForm";

@Service()
export class LanguageService {

    async create(data, include?:Includeable[]): Promise<PathfinderLanguage[]> {
        const langForm = new LanguageForm();
        const valid = langForm.validate(data);
        const langData= data.map(elem=>{return {name: elem.value}});
        return PathfinderLanguage.bulkCreate(langData,{include:include})
    }

    async delete(data:object) {

    }

    async update(data:object, include?:Includeable[]) {

    }

    async findBy(key,value,include?:Includeable[]): Promise<Promise<PathfinderLanguage>[]> {
        let condition = {};
        let langs = [];
        for (let singleVal of value) {
            condition[key]=singleVal;
            let response = await PathfinderLanguage.findOrCreate({where:condition, defaults:{name:singleVal}});
            langs.push(response[0])
        }
        return langs;
    }

    async findOneBy(key,value,include?:Includeable[]) {

    }

    async findAll(include?:Includeable[]) {
        return PathfinderLanguage.findAll({include:include});
    }

}