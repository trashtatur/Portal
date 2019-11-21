import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {Language} from "../../../db/schemas/Language";

@Service()
export class LanguageService {

    async create(data:any[], include?:Includeable[]): Promise<Language[]> {
        let langData= data.map(elem=>{return {name: elem.value}});
        return Language.bulkCreate(langData,{include:include})
    }

    async delete(data:object) {

    }

    async update(data:object, include?:Includeable[]) {

    }

    async findBy(key,value,include?:Includeable[]): Promise<Language[]> {
        let condition = {};
        condition[key]=value;
        let langs:Language[] = [];
        value.forEach(singleVal => {
            condition[key]=singleVal;
            Language.findOrCreate({where:condition, defaults:{name:singleVal}})
                .then(([result,created])=> {
                langs.push(result)
            });
        });
        return langs;
    }

    async findOneBy(key,value,include?:Includeable[]) {

    }

    async findAll(include?:Includeable[]) {
        return Language.findAll({include:include});
    }

}