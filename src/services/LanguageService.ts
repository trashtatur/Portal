import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {Language} from "../db/schemas/Language";
import {LanguageForm} from "../validation/LanguageForm";

@Service()
export class LanguageService {

    async create(data, include?:Includeable[]): Promise<Language[]> {
        const langForm = new LanguageForm();
        const valid = langForm.validate(data);
        const langData= data.map(elem=>{return {name: elem.value}});
        return Language.bulkCreate(langData,{include:include})
    }

    async delete(data:object) {

    }

    async update(data:object, include?:Includeable[]) {

    }

    async findBy(key,value,include?:Includeable[]): Promise<Promise<Language>[]> {
        let condition = {};
        let langs = [];
        for (let singleVal of value) {
            condition[key]=singleVal;
            let response = await Language.findOrCreate({where:condition, defaults:{name:singleVal}});
            langs.push(response[0])
        }
        return langs;
    }

    async findOneBy(key,value,include?:Includeable[]) {

    }

    async findAll(include?:Includeable[]) {
        return Language.findAll({include:include});
    }

}