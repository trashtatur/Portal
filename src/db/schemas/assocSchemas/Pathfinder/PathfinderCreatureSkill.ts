import {AllowNull, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {PathfinderSkill} from "../../pathfinder/PathfinderSkill";
import {PathfinderCreatureProperties} from "../../pathfinder/PathfinderCreatureProperties";

@Table
export class PathfinderCreatureSkill extends Model<PathfinderCreatureSkill> {

    @ForeignKey(()=> PathfinderCreatureProperties)
    @Column({type:DataType.UUID})
    propertyId;

    @ForeignKey(()=> PathfinderSkill)
    @Column({type:DataType.UUID})
    skillId;

    @AllowNull(true)
    @Column
    skillLevel: number;
}