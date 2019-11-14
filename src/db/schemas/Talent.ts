import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {Creature} from "./Creature";
import {CreatureTalent} from "./assocSchemas/CreatureTalent";

@Table
export class Talent extends  Model<Talent> {

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid:string;

    @AllowNull(false)
    @Unique(true)
    @Column
    name: string;

    @BelongsToMany(()=>Creature, ()=>CreatureTalent)
    creatures: Creature[]
}