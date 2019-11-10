import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Creature} from "./Creature";
import {CreatureSkill} from "./assocSchemas/CreatureSkill";

@Table
export class Skill extends  Model<Skill> {

    @PrimaryKey
    @Column({type:DataType.UUID})
    uuid:string;

    @AllowNull(false)
    @Column
    name: string;

    @BelongsToMany(()=>Creature, ()=>CreatureSkill)
    creatures: Creature[]

}