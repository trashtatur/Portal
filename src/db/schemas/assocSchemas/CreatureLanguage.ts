import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Creature} from "../Creature";
import {Language} from "../Language";

@Table
export class CreatureLanguage extends Model<CreatureLanguage> {

    @ForeignKey(()=> Creature)
    @Column({type:DataType.UUID})
    creatureId;

    @ForeignKey(()=> Language)
    @Column({type:DataType.UUID})
    languageId;
}