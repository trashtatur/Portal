import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {Sense} from "../../../db/schemas/Sense";

@Service()
export class SenseService {

    async create(data:object, include?:Includeable[]) {

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