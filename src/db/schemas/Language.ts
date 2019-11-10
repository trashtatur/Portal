import {DataType, Column, Model, PrimaryKey, Table, NotNull, BelongsToMany, AllowNull} from "sequelize-typescript";
import {Creature} from "./Creature";
import {CreatureAction} from "./assocSchemas/CreatureAction";
import {CreatureLanguage} from "./assocSchemas/CreatureLanguage";

@Table
export class Language extends Model<Language> {

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid:string;

    @AllowNull(false)
    @Column
    name: string;

    @BelongsToMany(()=>Creature, ()=>CreatureLanguage)
    creatures: Creature[]
}