import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Creature} from "./Creature";
import {CreatureSense} from "./assocSchemas/CreatureSense";

@Table
export class Sense extends Model<Sense> {

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid:string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    range;

    @BelongsToMany(()=>Creature, ()=>CreatureSense)
    creatures: Creature[]
}