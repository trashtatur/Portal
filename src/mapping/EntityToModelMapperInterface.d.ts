import {Model} from "sequelize-typescript";
import {ModelInterface} from "../model/ModelInterface";

export interface EntityToModelMapperInterface {

    map(model: Model): ModelInterface;
}