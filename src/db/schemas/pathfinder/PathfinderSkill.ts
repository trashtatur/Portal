import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {Creature} from "../Creature";
import {PathfinderCreatureSkill} from "../assocSchemas/Pathfinder/PathfinderCreatureSkill";
import {PathfinderCreatureProperties} from "./PathfinderCreatureProperties";

@Table
export class PathfinderSkill extends  Model<PathfinderSkill> {

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue:DataType.UUIDV4})
    uuid:string;

    @AllowNull(false)
    @Unique(true)
    @Column
    name: string;

    @BelongsToMany(()=>PathfinderCreatureProperties, ()=>PathfinderCreatureSkill)
    creatures: PathfinderCreatureProperties[]

}