import {
    AllowNull,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table, Unique
} from "sequelize-typescript";
import {Creature} from "./Creature";
import {CreatureFight} from "./assocSchemas/CreatureFight";
import {Group} from "./Group";

@Table
export class Fight extends Model<Fight> {

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid: string;

    @Unique(true)
    @Column
    name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    get modifyMap(): any {
        return JSON.parse(this.getDataValue('modifyMap'))
    }

    set ModifyMap(val) {
        this.setDataValue('modifyMap', JSON.stringify(val))
    }

    @BelongsToMany(()=>Creature, ()=>CreatureFight)
    creatures: Creature[]

    @BelongsTo(()=>Group)
    group: Group;

    @ForeignKey(()=>Group)
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    groupId;
}