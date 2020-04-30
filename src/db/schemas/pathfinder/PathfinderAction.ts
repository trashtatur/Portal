import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {PathfinderCreatureAction} from "../assocSchemas/Pathfinder/PathfinderCreatureAction";
import {PathfinderCreatureProperties} from "./PathfinderCreatureProperties";

@Table
export class PathfinderAction extends Model<PathfinderAction> {

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
    critMod: number;

    @AllowNull(false)
    @Column
    damageType: string;

    @AllowNull(true)
    @Column
    additionalInfo: string;

    @BelongsToMany(() => PathfinderCreatureProperties, () => PathfinderCreatureAction)
    creatures: PathfinderCreatureProperties[]
}


