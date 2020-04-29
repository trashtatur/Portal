import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {DND5CreatureProperties} from "../../DND5/DND5CreatureProperties";
import {DND5Action} from "../../DND5/DND5Action";
import {DND5Skill} from "../../DND5/DND5Skill";

@Table
export class DND5CreatureSkill extends Model<DND5CreatureSkill> {

    @ForeignKey(()=> DND5CreatureProperties)
    @Column({type:DataType.UUID})
    dnd5CreaturePropertiesId;

    @ForeignKey(()=> DND5Skill)
    @Column({type:DataType.UUID})
    skillId;
}