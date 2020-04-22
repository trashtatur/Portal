import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Person} from "../Person";
import {Adventure} from "../Adventure";

@Table({tableName: 'AdventurePersons'})
export class AdventurePerson extends Model<AdventurePerson> {

    @ForeignKey(()=> Adventure)
    @Column({type:DataType.UUID})
    adventureId;

    @ForeignKey(()=> Person)
    @Column({type:DataType.UUID})
    personId;
}