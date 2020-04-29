import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {DND5CreatureProperties} from "../../DND5/DND5CreatureProperties";
import {DND5Language} from "../../DND5/DND5Language";

@Table
export class DND5CreatureLanguage extends Model<DND5CreatureLanguage> {

    @ForeignKey(()=> DND5CreatureProperties)
    @Column({type:DataType.UUID})
    dnd5CreaturePropertiesId;

    @ForeignKey(()=> DND5Language)
    @Column({type:DataType.UUID})
    languageId;
}