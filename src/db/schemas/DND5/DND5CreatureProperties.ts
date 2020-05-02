import {
    AllowNull,
    BelongsToMany,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {Creature} from "../Creature";
import {DND5Action} from "./DND5Action";
import {DND5CreatureAction} from "../assocSchemas/DND5/DND5CreatureAction";
import {DND5Talent} from "./DND5Talent";
import {DND5Skill} from "./DND5Skill";
import {DND5Language} from "./DND5Language";
import {DND5CreatureLanguage} from "../assocSchemas/DND5/DND5CreatureLanguage";
import {DND5CreatureSkill} from "../assocSchemas/DND5/DND5CreatureSkill";
import {DND5CreatureTalent} from "../assocSchemas/DND5/DND5CreatureTalent";
import {DND5Spell} from "./DND5Spell";
import {DND5CreatureSpell} from "../assocSchemas/DND5/DND5CreatureSpell";

@Table({tableName: 'DND5CreatureProperties'})
export class DND5CreatureProperties extends Model<DND5CreatureProperties>{

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid: string;

    @ForeignKey(()=>Creature)
    @Column({type: DataType.UUID})
    creatureId: string;

    @AllowNull(false)
    @Default(false)
    @Column
    isOfficialCreature: boolean;

    @AllowNull(false)
    @Column
    type: string;

    @AllowNull(false)
    @Column
    armorclass: number;

    @AllowNull(false)
    @Column
    armorType: string;

    @AllowNull(false)
    @Column
    hitpoints: number;

    @AllowNull(false)
    @Column
    hitDice: string;

    @AllowNull(false)
    @Column
    alignment: string;

    @AllowNull(true)
    @Column({type: DataType.TEXT({length: 'long'})})
    attackProperties;

    @AllowNull(false)
    @Column
    creatureType: string;

    @AllowNull(false)
    @Column
    challenge: number;

    @AllowNull(false)
    @Column
    xp: number;

    @AllowNull(false)
    @Column
    stats: string;

    @AllowNull(false)
    @Column
    size: string;

    @AllowNull(false)
    @Column
    speed: string;

    @AllowNull(true)
    @Column({type: DataType.TEXT({length: 'medium'})})
    classesAndLevels

    @AllowNull(true)
    @Column
    damageVulnerabilities: string;

    @AllowNull(true)
    @Column
    damageResistances: string;

    @AllowNull(true)
    @Column
    conditionImmunities: string;

    @AllowNull(true)
    @Column
    damageImmunities: string;

    @AllowNull(true)
    @Column
    savingThrows: string;

    @AllowNull(true)
    @Column
    image: string;

    @AllowNull(true)
    @Column
    senses: string;

    @AllowNull(true)
    @Column
    legendaryActions: string

    @AllowNull(true)
    @Column
    reactions: string;

    @BelongsToMany(()=> DND5Action, ()=> DND5CreatureAction)
    actions: DND5Action[];

    @BelongsToMany(()=> DND5Talent, ()=> DND5CreatureTalent)
    talents: DND5Talent[];

    @BelongsToMany(()=> DND5Skill, ()=> DND5CreatureSkill)
    skills: DND5Skill[];

    @BelongsToMany(()=> DND5Language, ()=> DND5CreatureLanguage)
    languages: DND5Language[];

    @BelongsToMany(()=> DND5Spell, ()=>DND5CreatureSpell)
    spells: DND5Spell[];
}