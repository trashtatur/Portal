import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Creature} from "../Creature";
import {Sense} from "../Sense";

@Table
export class CreatureSense extends Model<CreatureSense> {

    @ForeignKey(()=> Creature)
    @Column({type:DataType.UUID})
    creatureId;

    @ForeignKey(()=> Sense)
    @Column({type:DataType.UUID})
    senseId;
}