import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";
import {DND5CreatureProperties} from "./DND5CreatureProperties";
import {DND5CreatureAction} from "../assocSchemas/DND5/DND5CreatureAction";

@Table
export class DND5Action extends Model<DND5Action>{

    @PrimaryKey
    @Column({
        type: DataType.UUID, defaultValue: DataType.UUIDV4
    })
    uuid: string;

    @AllowNull(false)
    @Column({
        unique: 'name_dmg'
    })
    name: string;

    @AllowNull(false)
    @Column
    rangeType: string;

    @AllowNull(false)
    @Column
    attackBonus: number;

    @AllowNull(false)
    @Column(
        DataType.FLOAT
    )
    range;

    @AllowNull(false)
    @Column
    magical: boolean;

    @AllowNull(false)
    @Column({
        unique: 'name_dmg'
    })
    damage: string;

    @AllowNull(false)
    @Column
    damageType: string;

    @AllowNull(true)
    @Column
    additionalInfo: string;

    @BelongsToMany(()=>DND5CreatureProperties, ()=>DND5CreatureAction)
    dnd5CreatureProperties: DND5CreatureProperties[]
}