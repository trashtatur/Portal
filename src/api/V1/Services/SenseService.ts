import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {Sense} from "../../../db/schemas/Sense";

@Service()
export class SenseService {

    async create(data:any[], include?:Includeable[]): Promise<Sense[]> {
        let senseData = data.map(elem=>{return {name: elem.value}});
        return Sense.bulkCreate(senseData,{include:include});
    }

    async delete(data:object) {

    }

    async update(data:object, include?:Includeable[]) {

    }

    async findBy(key,value,include?:Includeable[]): Promise<Sense[]> {
        let condition = {};
        condition[key]=value;
        return Sense.findAll(
            {where: condition, include: include});
    }

    async findOneBy(key,value,include?:Includeable[]) {

    }

    async findAll(include?:Includeable[]) {

    }
}