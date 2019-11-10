import {BelongsToMany, Column, DataType, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Creature} from "./Creature";
import {Fight} from "./Fight";
import {CreatureGroup} from "./assocSchemas/CreatureGroup";

@Table
export class Group extends Model<Group> {

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid: string;

    @Column
    name: string;

    @BelongsToMany(()=>Creature, ()=>CreatureGroup)
    creatures: Creature[];

    @HasMany(()=> Fight)
    fights: Fight[]
}