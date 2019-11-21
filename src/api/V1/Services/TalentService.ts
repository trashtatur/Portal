import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {Talent} from "../../../db/schemas/Talent";
import {Language} from "../../../db/schemas/Language";

@Service()
export class TalentService {

    async create(data:any[], include?:Includeable[]): Promise<Talent[]> {
        let talentData = data.map(elem=>{return {name: elem.value}});
        return Talent.bulkCreate(talentData,{include:include})
    }

    async delete(data:object) {

    }

    async update(data:object, include?:Includeable[]) {

    }

    async findBy(key,value,include?:Includeable[]): Promise<Talent[]> {
        let condition = {};
        condition[key]=value;
        let talents:Talent[] = [];
        value.forEach(singleVal => {
            condition[key]=singleVal;
            Talent.findOrCreate({where:condition, defaults:{name:singleVal}})
                .then(([result,created])=> {
                    talents.push(result)
                });
        });
        return talents;
    }

    async findAll(include?:Includeable[]) {
        return Talent.findAll({include:include})
    }

}