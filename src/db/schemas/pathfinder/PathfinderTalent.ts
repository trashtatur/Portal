import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {PathfinderCreatureTalent} from "../assocSchemas/Pathfinder/PathfinderCreatureTalent";
import {PathfinderCreatureProperties} from "./PathfinderCreatureProperties";

@Table
export class PathfinderTalent extends  Model<PathfinderTalent> {

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

    @BelongsToMany(()=>PathfinderCreatureProperties, ()=>PathfinderCreatureTalent)
    creatures: PathfinderCreatureProperties[]
}