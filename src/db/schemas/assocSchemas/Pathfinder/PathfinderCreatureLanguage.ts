import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {PathfinderLanguage} from "../../pathfinder/PathfinderLanguage";
import {PathfinderCreatureProperties} from "../../pathfinder/PathfinderCreatureProperties";

@Table
export class PathfinderCreatureLanguage extends Model<PathfinderCreatureLanguage> {

    @ForeignKey(()=> PathfinderCreatureProperties)
    @Column({type:DataType.UUID})
    creatureId;

    @ForeignKey(()=> PathfinderLanguage)
    @Column({type:DataType.UUID})
    languageId;
}