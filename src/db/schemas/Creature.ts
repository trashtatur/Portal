import {
    AllowNull,
    Column,
    DataType, HasMany, HasOne,
    Model,
    PrimaryKey,
    Table, Unique
} from "sequelize-typescript";
import {PathfinderCreatureProperties} from "./pathfinder/PathfinderCreatureProperties";
import {DND5CreatureProperties} from "./DND5/DND5CreatureProperties";


@Table
export class Creature extends Model<Creature> {

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid: string;

    @AllowNull(false)
    @Unique
    @Column
    name: string;

    @HasOne(()=> PathfinderCreatureProperties)
    pathfinderCreatureProperties: PathfinderCreatureProperties;

    @HasOne(()=> DND5CreatureProperties)
    dnd5CreatureProperties: DND5CreatureProperties;
}


