import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {DND5CreatureProperties} from "../../DND5/DND5CreatureProperties";
import {DND5Spell} from "../../DND5/DND5Spell";

@Table
export class DND5CreatureSpell extends Model<DND5CreatureSpell>{

    @ForeignKey(()=> DND5CreatureProperties)
    @Column({type:DataType.UUID})
    dnd5CreaturePropertiesId;

    @ForeignKey(()=> DND5Spell)
    @Column({type:DataType.UUID})
    spellId;
}