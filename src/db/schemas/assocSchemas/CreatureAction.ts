import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Creature} from "../Creature";
import {Action} from "../Action";

@Table
export class CreatureAction extends Model<CreatureAction> {

    @ForeignKey(()=> Creature)
    @Column({type:DataType.UUID})
    creatureId;

    @ForeignKey(()=> Action)
    @Column({type:DataType.UUID})
    actionId;
}