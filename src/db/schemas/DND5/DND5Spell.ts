import {AllowNull, BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {DND5CreatureProperties} from "./DND5CreatureProperties";
import {DND5CreatureSpell} from "../assocSchemas/DND5/DND5CreatureSpell";

@Table
export class DND5Spell extends Model<DND5Spell> {

    @PrimaryKey
    @Column({
        type: DataType.UUID, defaultValue: DataType.UUIDV4
    })
    uuid: string;

    @AllowNull(false)
    @Unique
    @Column
    name: string;

    @AllowNull(false)
    @Column({type: DataType.TEXT({length: 'long'})})
    description: string;

    @AllowNull(true)
    @Column({type: DataType.TEXT({length: 'long'})})
    higherLevelsDescription: string;

    @AllowNull(false)
    @Column
    range: string;

    @AllowNull(false)
    @Column
    components: string;

    @AllowNull(false)
    @Default(false)
    @Column
    ritual: boolean;

    @AllowNull(false)
    @Column
    duration: string;

    @AllowNull(false)
    @Default(false)
    @Column
    concentration: boolean;

    @AllowNull(false)
    @Column
    castingTime: string;

    @AllowNull(false)
    @Column
    school: string;

    @AllowNull(true)
    @Column({type: DataType.TEXT({length: 'medium'})})
    materials: string;

    @AllowNull(true)
    @Column
    level: number;

    @BelongsToMany(()=> DND5CreatureProperties, ()=> DND5CreatureSpell)
    dnd5CreatureProperties: DND5CreatureProperties[];
}