import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";
import {DND5CreatureProperties} from "./DND5CreatureProperties";
import {DND5CreatureSkill} from "../assocSchemas/DND5/DND5CreatureSkill";

@Table
export class DND5Skill extends Model<DND5Skill>{

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid: string;

    @AllowNull(false)
    @Column
    name: string;

    @BelongsToMany(()=> DND5CreatureProperties, ()=> DND5CreatureSkill)
    dnd5CreatureProperties: DND5CreatureProperties[];
}