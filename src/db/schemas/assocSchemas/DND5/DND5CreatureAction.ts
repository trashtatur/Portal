import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {DND5CreatureProperties} from "../../DND5/DND5CreatureProperties";
import {DND5Action} from "../../DND5/DND5Action";

@Table
export class DND5CreatureAction extends Model<DND5CreatureAction> {

    @ForeignKey(()=> DND5CreatureProperties)
    @Column({type:DataType.UUID})
    dnd5CreaturePropertiesId;

    @ForeignKey(()=> DND5Action)
    @Column({type:DataType.UUID})
    actionId;
}