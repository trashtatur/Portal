import {AllowNull, BelongsToMany, Column, DataType, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Scene} from "./Scene";
import {Person} from "./Person";
import {AdventurePerson} from "./assocSchemas/AdventurePerson";

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
    scenes: Scene[];

    @BelongsToMany(()=> Person, ()=>AdventurePerson)
    persons: Person[];
}