import {Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Creature} from "../Creature";

@Table({tableName: 'DND5CreatureProperties'})
export class DND5CreatureProperties extends Model<DND5CreatureProperties>{

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid: string;

    @ForeignKey(()=>Creature)
    @Column({type: DataType.UUID})
    creatureId: string;
}