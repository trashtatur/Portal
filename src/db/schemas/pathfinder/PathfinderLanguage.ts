import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {Creature} from "../Creature";
import {PathfinderCreatureLanguage} from "../assocSchemas/Pathfinder/PathfinderCreatureLanguage";
import {PathfinderCreatureProperties} from "./PathfinderCreatureProperties";

@Table
export class PathfinderLanguage extends Model<PathfinderLanguage> {

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid:string;

    @AllowNull(false)
    @Unique(true)
    @Column
    name: string;

    @BelongsToMany(()=>PathfinderCreatureProperties, ()=>PathfinderCreatureLanguage)
    creatures: PathfinderCreatureProperties[]
}