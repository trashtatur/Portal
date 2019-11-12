import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Creature} from "../Creature";
import {Skill} from "../Skill";

@Table
export class CreatureSkill extends Model<CreatureSkill> {

    @ForeignKey(()=> Creature)
    @Column({type:DataType.UUID})
    creatureId;

    @ForeignKey(()=> Skill)
    @Column({type:DataType.UUID})
    skillId;
}