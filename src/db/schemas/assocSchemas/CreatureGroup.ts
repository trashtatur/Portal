import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Creature} from "../Creature";
import {Group} from "../Group";

@Table
export class CreatureGroup extends Model<CreatureGroup> {

    @ForeignKey(()=> Creature)
    @Column({type:DataType.UUID})
    creatureId;

    @ForeignKey(()=> Group)
    @Column({type:DataType.UUID})
    groupId;
}