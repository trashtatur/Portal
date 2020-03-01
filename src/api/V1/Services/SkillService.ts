import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {Skill} from "../../../db/schemas/Skill";
import {Language} from "../../../db/schemas/Language";

@Service()
export class SkillService {

    async create(data:any[], include?:Includeable[]):Promise<Skill[]> {
        let skillData = data.map(elem=>{return {name: elem.value}});
        return Skill.bulkCreate(skillData,{include:include});
    }

    async delete(data:object) {

    }

    async update(data:object, include?:Includeable[]) {

    }

    async findBy(key,value,include?:Includeable[]): Promise<Skill[]> {
        let condition = {};
        condition[key]=value;
        let skills:Skill[] = [];
        for (let singleVal of value) {
           condition[key]=singleVal;
           let result = await Skill.findOrCreate({where:condition, defaults:{name:singleVal}});
           skills.push(result[0])
        }
        return skills;
    }

    async findOneBy(key,value,include?:Includeable[]) {

    }

    async findAll(include?:Includeable[]) {
        return Skill.findAll({include: include})
    }
}