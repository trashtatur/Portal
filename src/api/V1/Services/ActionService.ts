import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {Action} from "../../../db/schemas/Action";

@Service()
export class ActionService {

    async create(data:object, include?:Includeable[]) {
        return Action.create(data,{include: include});
    }

    async delete(data:object) {

    }

    async update(data:object, include?:Includeable[]) {

    }

    async findBy(key,value,include?:Includeable[]): Promise<Action[]> {
        let condition = {};
        condition[key]=value;
        return Action.findAll(
            {where: condition, include: include});
    }

    async findOneBy(key,value,include?:Includeable[]) {

    }

    async findAll(include?:Includeable[]) {
        return Action.findAll({include:include})
    }

}