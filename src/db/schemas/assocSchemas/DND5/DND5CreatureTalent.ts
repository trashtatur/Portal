import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {DND5CreatureProperties} from "../../DND5/DND5CreatureProperties";
import {DND5Talent} from "../../DND5/DND5Talent";

@Table
export class DND5CreatureTalent extends Model<DND5CreatureTalent> {

    @ForeignKey(()=> DND5CreatureProperties)
    @Column({type:DataType.UUID})
    dnd5CreaturePropertiesId;

    @ForeignKey(()=> DND5Talent)
    @Column({type:DataType.UUID})
    talentId;
}