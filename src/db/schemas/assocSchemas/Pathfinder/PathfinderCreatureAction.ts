import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {PathfinderAction} from "../../pathfinder/PathfinderAction";
import {PathfinderCreatureProperties} from "../../pathfinder/PathfinderCreatureProperties";

@Table
export class PathfinderCreatureAction extends Model<PathfinderCreatureAction> {

    @ForeignKey(()=> PathfinderCreatureProperties)
    @Column({type:DataType.UUID})
    pathfinderCreaturePropertiesId;

    @ForeignKey(()=> PathfinderAction)
    @Column({type:DataType.UUID})
    actionId;
}