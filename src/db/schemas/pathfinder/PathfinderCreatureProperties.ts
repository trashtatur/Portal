import {
    AllowNull,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {PathfinderAction} from "./PathfinderAction";
import {PathfinderCreatureAction} from "../assocSchemas/Pathfinder/PathfinderCreatureAction";
import {PathfinderLanguage} from "./PathfinderLanguage";
import {PathfinderCreatureLanguage} from "../assocSchemas/Pathfinder/PathfinderCreatureLanguage";
import {PathfinderSkill} from "./PathfinderSkill";
import {PathfinderCreatureSkill} from "../assocSchemas/Pathfinder/PathfinderCreatureSkill";
import {PathfinderTalent} from "./PathfinderTalent";
import {PathfinderCreatureTalent} from "../assocSchemas/Pathfinder/PathfinderCreatureTalent";
import {Creature} from "../Creature";

@Table({tableName: 'PathfinderCreatureProperties'})
export class PathfinderCreatureProperties extends Model<PathfinderCreatureProperties>{

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid: string;

    @ForeignKey(()=>Creature)
    @Column({type: DataType.UUID})
    creatureId: string;

    @AllowNull(false)
    @Column
    type: string;

    @AllowNull(false)
    @Column
    armorclass: number;

    @AllowNull(true)
    @Column({type: DataType.TEXT({length: 'long'})})
    attackProperties;

    @AllowNull(false)
    @Column
    hitpoints: number;

    @AllowNull(false)
    @Column
    alignment: string;

    @AllowNull(false)
    @Column
    creatureClass: string;

    @AllowNull(false)
    @Column
    challenge: number;

    @AllowNull(false)
    @Column
    movement: number;

    @AllowNull(false)
    @Column
    ini: number;

    @AllowNull(false)
    @Column
    baseAtk: number;

    @AllowNull( true)
    @Column
    xp: number;

    @AllowNull(false)
    @Column
    size: string;

    @AllowNull(false)
    @Column({type: DataType.TEXT({length: 'long'})})
    stats;

    @AllowNull(false)
    @Column({type: DataType.TEXT({length: 'long'})})
    saveThrows;

    @AllowNull(true)
    @Column({ type: DataType.STRING(2000)})
    image: string;

    @BelongsToMany(()=> PathfinderAction, () => PathfinderCreatureAction)
    actions: PathfinderAction[];

    @BelongsToMany(()=> PathfinderLanguage, ()=> PathfinderCreatureLanguage)
    languages: PathfinderLanguage[];

    @BelongsToMany(()=> PathfinderSkill, ()=> PathfinderCreatureSkill)
    skills: PathfinderSkill[];

    @BelongsToMany(()=> PathfinderTalent, ()=> PathfinderCreatureTalent)
    talents: PathfinderTalent[];

    @BelongsTo(()=>Creature)
    creature: Creature;
}