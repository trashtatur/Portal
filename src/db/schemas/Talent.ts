import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {Creature} from "./Creature";
import {CreatureTalent} from "./assocSchemas/CreatureTalent";
import {Col} from "sequelize/types/lib/utils";

@Table
export class Talent extends  Model<Talent> {

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid: string;

    @AllowNull(false)
    @Column({
        unique: 'name_type'
    })
    name: string;

    @AllowNull(true)
    @Column({
        unique: 'name_type'
    })
    type: string;

    @AllowNull(false)
    @Column({type: DataType.TEXT({length: 'medium'})})
    description;

    @AllowNull(false)
    @Column({type: DataType.TEXT})
    benefits;

    @AllowNull(true)
    @Column({type: DataType.TEXT({length: 'medium'})})
    conditions;

    @AllowNull(true)
    @Column({type: DataType.TEXT({length: 'medium'})})
    note;

    @BelongsToMany(()=>Creature, ()=>CreatureTalent)
    creatures: Creature[]
}