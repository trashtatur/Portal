import {Model} from "sequelize-typescript";
import {ModelInterface} from "../model/ModelInterface";

export interface EntityToModelMapperInterface {

    map(entity: Model): ModelInterface;
}