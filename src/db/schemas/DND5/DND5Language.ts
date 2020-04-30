import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";
import {DND5CreatureProperties} from "./DND5CreatureProperties";
import {DND5CreatureLanguage} from "../assocSchemas/DND5/DND5CreatureLanguage";

@Table
export class DND5Language extends Model<DND5Language>{

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid: string;

    @AllowNull(false)
    @Column
    name: string;

    @BelongsToMany(()=> DND5CreatureProperties, ()=> DND5CreatureLanguage)
    dnd5CreatureProperties: DND5CreatureProperties[];
}