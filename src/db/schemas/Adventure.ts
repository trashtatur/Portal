import {AllowNull, Column, DataType, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Scene} from "./Scene";

@Table
export class Adventure extends Model<Adventure>{

    @PrimaryKey
    @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid: string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column({type: DataType.TEXT({length: 'long'})})
    core;

    @HasMany(() => Scene)
    scenes: Scene[]
}