import {
    AllowNull,
    BelongsToMany,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {Action} from "./Action";
import {CreatureAction} from "./assocSchemas/CreatureAction";
import {Language} from "./Language";
import {CreatureLanguage} from "./assocSchemas/CreatureLanguage";
import {Skill} from "./Skill";
import {CreatureSkill} from "./assocSchemas/CreatureSkill";
import {Talent} from "./Talent";
import {CreatureTalent} from "./assocSchemas/CreatureTalent";
import {Fight} from "./Fight";
import {CreatureFight} from "./assocSchemas/CreatureFight";
import {Group} from "./Group";
import {CreatureGroup} from "./assocSchemas/CreatureGroup";


@Table
export class Creature extends Model<Creature> {

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid: string;

    @AllowNull(false)
    @Column({
        unique:'creature_cr'
    })
    name: string;

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
    @Column({
        unique:'creature_cr'
    })
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

    @BelongsToMany(()=> Action, () => CreatureAction)
    actions: Action[];

    @BelongsToMany(()=> Language, ()=> CreatureLanguage)
    languages: Language[];

    @BelongsToMany(()=> Skill, ()=> CreatureSkill)
    skills: Skill[];

    @BelongsToMany(()=> Talent, ()=> CreatureTalent)
    talents: Talent[];

    @BelongsToMany(()=>Fight, ()=> CreatureFight)
    fights: Fight[];

    @BelongsToMany(()=>Group, ()=> CreatureGroup)
    groups: Group[];
}


