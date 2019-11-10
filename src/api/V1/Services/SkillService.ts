import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {Skill} from "../../../db/schemas/Skill";

@Service()
export class SkillService {

    async create(data:object, include?:Includeable[]) {

    }

    async delete(data:object) {

    }

    async update(data:object, include?:Includeable[]) {

    }

    async findBy(key,value,include?:Includeable[]): Promise<Skill[]> {
        let condition = {};
        condition[key]=value;
        return Skill.findAll(
            {where: condition, include: include});
    }

    async findOneBy(key,value,include?:Includeable[]) {

    }

    async findAll(include?:Includeable[]) {

    }
}