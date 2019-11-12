import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Creature} from "../Creature";
import {Talent} from "../Talent";

@Table
export class CreatureTalent extends Model<CreatureTalent> {

    @ForeignKey(()=> Creature)
    @Column({type:DataType.UUID})
    creatureId;

    @ForeignKey(()=> Talent)
    @Column({type:DataType.UUID})
    talentId;
}