import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {PathfinderSkill} from "../db/schemas/pathfinder/PathfinderSkill";
import {PathfinderLanguage} from "../db/schemas/pathfinder/PathfinderLanguage";

@Service()
export class SkillService {

    async create(data:any[], include?:Includeable[]):Promise<PathfinderSkill[]> {
        let skillData = data.map(elem=>{return {name: elem.value}});
        return PathfinderSkill.bulkCreate(skillData,{include:include});
    }

    async delete(data:object) {

    }

    async update(data:object, include?:Includeable[]) {

    }

    async findBy(key,value,include?:Includeable[]): Promise<PathfinderSkill[]> {
        let condition = {};
        condition[key]=value;
        let skills:PathfinderSkill[] = [];
        for (let singleVal of value) {
           condition[key]=singleVal;
           let result = await PathfinderSkill.findOrCreate({where:condition, defaults:{name:singleVal}});
           skills.push(result[0])
        }
        return skills;
    }

    async findOneBy(key,value,include?:Includeable[]) {

    }

    async findAll(include?:Includeable[]) {
        return PathfinderSkill.findAll({include: include})
    }
}