import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {Language} from "../../../db/schemas/Language";

@Service()
export class LanguageService {

    async create(data:object, include?:Includeable[]) {

    }

    async delete(data:object) {

    }

    async update(data:object, include?:Includeable[]) {

    }

    async findBy(key,value,include?:Includeable[]): Promise<Language[]> {
        let condition = {};
        condition[key]=value;
        return Language.findAll(
            {where: condition, include: include});
    }

    async findOneBy(key,value,include?:Includeable[]) {

    }

    async findAll(include?:Includeable[]) {
        return Language.findAll({include:include});
    }

}