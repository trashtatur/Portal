import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Creature} from "../Creature";
import {Fight} from "../Fight";

@Table
export class CreatureFight extends Model<CreatureFight> {

    @ForeignKey(()=> Creature)
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    creatureId;

    @ForeignKey(()=> Fight)
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    fightId;
}