import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {Creature} from "./Creature";
import {CreatureLanguage} from "./assocSchemas/CreatureLanguage";

@Table
export class Language extends Model<Language> {

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid:string;

    @AllowNull(false)
    @Unique(true)
    @Column
    name: string;

    @BelongsToMany(()=>Creature, ()=>CreatureLanguage)
    creatures: Creature[]
}