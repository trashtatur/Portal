import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";
import {DND5CreatureProperties} from "./DND5CreatureProperties";
import {DND5CreatureTalent} from "../assocSchemas/DND5/DND5CreatureTalent";

@Table
export class DND5Talent extends Model<DND5Talent> {

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid: string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(true)
    @Column({type: DataType.TEXT({length: 'medium'})})
    condition: string;

    @AllowNull(false)
    @Column({type: DataType.TEXT({length: 'medium'})})
    benefit: string;

    @BelongsToMany(()=> DND5CreatureProperties, ()=> DND5CreatureTalent)
    dnd5CreatureProperties: DND5CreatureProperties[];
}