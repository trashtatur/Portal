import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {PathfinderTalent} from "../../pathfinder/PathfinderTalent";
import {PathfinderCreatureProperties} from "../../pathfinder/PathfinderCreatureProperties";

@Table
export class PathfinderCreatureTalent extends Model<PathfinderCreatureTalent> {

    @ForeignKey(()=> PathfinderCreatureProperties)
    @Column({type:DataType.UUID})
    creatureId;

    @ForeignKey(()=> PathfinderTalent)
    @Column({type:DataType.UUID})
    talentId;
}