import {
    AllowNull, BeforeCreate,
    BeforeUpdate,
    BelongsToMany,
    Column,
    DataType,
    Is,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {Action} from "./Action";
import {CreatureAction} from "./assocSchemas/CreatureAction";
import {Language} from "./Language";
import {CreatureLanguage} from "./assocSchemas/CreatureLanguage";
import {Sense} from "./Sense";
import {CreatureSense} from "./assocSchemas/CreatureSense";
import {Skill} from "./Skill";
import {CreatureSkill} from "./assocSchemas/CreatureSkill";
import {Talent} from "./Talent";
import {CreatureTalent} from "./assocSchemas/CreatureTalent";
import {Fight} from "./Fight";
import {CreatureFight} from "./assocSchemas/CreatureFight";
import {Group} from "./Group";
import {CreatureGroup} from "./assocSchemas/CreatureGroup";
import {attackProperty} from "../../view/components/creaturecard/CreatureCard";


@Table
export class Creature extends Model<Creature> {

    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid:string;

    @AllowNull(false)
    @Column({
        unique:'creature_cr'
    })
    name: string;

    @Is('type',value => {
        let checklist = ['player','monster','ally'];
        if (!checklist.includes(value.toLowerCase())) {
            throw Error(`${value} must be one of these values: ${checklist}`)
        }
    })
    @AllowNull(false)
    @Column
    type: string;

    @AllowNull(false)
    @Column
    armorclass: number;

    @AllowNull(true)
    @Column({ type: DataType.STRING(2000)})
    get attackProperties() {
        let value = this.getDataValue('attackProperties');
        // @ts-ignore
        let value_parsed = JSON.parse(value);
        return value_parsed
    };

    set attackProperties(val:attackProperty[]) {
        let parsed_val = val.map(elem => {
           return `{"name":"${elem.name}", "property":"${elem.property}"}`
        });
        // @ts-ignore
        this.setDataValue('attackProperties',`[${parsed_val.join()}]`)
    }

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

    @Is('size',value=>{
        let testlist = ["colossal","gargantuan", "huge","large","medium","small","tiny","diminutive","fine"];
        if (!testlist.includes(value.toLowerCase().trim())) {
            throw new Error(`Size value must be one of: ${JSON.stringify(testlist)}`)
        }
    })
    @AllowNull(false)
    @Column
    size: string;

    @Is('stats', value => {
        let value_parsed = value;
        if (typeof value_parsed != "object") value_parsed = JSON.parse(value);
        if (typeof value_parsed == "object") {
            let val_keys = Object.keys(value_parsed).map(val => {return val.toLowerCase()});
            const testlist = ["str","dex","wis","int","cha","con"];
            if (JSON.stringify(testlist.sort()) == JSON.stringify(val_keys.sort())) {
                let check = Object.values(value_parsed).filter(val => {
                    if (typeof val == "number") return val;
                });
                if (check.length != Object.values(value_parsed).length) {
                    throw Error(`At least value_parsed in the stat map (${JSON.stringify(value_parsed)}) is not a number`)
                }
            } else {
                throw Error(`The provided stat map (${JSON.stringify(value)}) does not have all keys`)
            }
        } else {
            throw Error(`The provided stat map (${JSON.stringify(value)}) is not a proper JSON map`)
        }
    })
    @AllowNull(false)
    @Column(DataType.JSON)
    get stats(): object {
        // @ts-ignore
        return this.getDataValue('stats')
    }

    set stats(value) {
        // @ts-ignore
        this.setDataValue('stats', value);
    }

    @AllowNull(true)
    @Column
    kmv: number;

    @AllowNull(true)
    @Column
    kmb: number;

    @AllowNull(true)
    @Column
    sizemod: number;


    @Is('saveThrows', value => {
        let value_parsed = value;
        if (typeof value_parsed != "object") value_parsed = JSON.parse(value);
        if (typeof value_parsed == "object") {
            let val_keys = Object.keys(value_parsed).map(val => {return val.toLowerCase()});
            const testlist = ["ref","will","fort"];
            if (JSON.stringify(testlist.sort()) == JSON.stringify(val_keys.sort())) {
                let check = Object.values(value_parsed).filter(val => {
                    if (typeof val == "number") return val;
                });
                if (check.length != Object.values(value_parsed).length) {
                    throw Error(`At least value_parsed in the save throws map (${JSON.stringify(value_parsed)}) is not a number`)
                }
            } else {
                throw Error(`The provided save throws map (${JSON.stringify(value)}) does not have all keys`)
            }
        } else {
            throw Error(`The provided save throws map (${JSON.stringify(value)}) is not a proper JSON map`)
        }
    })
    @AllowNull(false)
    @Column(DataType.JSON)
    get saveThrows(): string[] {
        // @ts-ignore
        return this.getDataValue('saveThrows')
    }

    set saveThrows(val) {
        this.setDataValue('saveThrows', val);
    }

    @AllowNull(true)
    @Column({ type: DataType.STRING(2000)})
    image: string;

    @BelongsToMany(()=> Action, () => CreatureAction)
    actions: Action[];

    @BelongsToMany(()=> Language, ()=> CreatureLanguage)
    languages: Language[];

    @BelongsToMany(()=> Sense, ()=> CreatureSense)
    senses: Sense[];

    @BelongsToMany(()=> Skill, ()=> CreatureSkill)
    skills: Skill[];

    @BelongsToMany(()=> Talent, ()=> CreatureTalent)
    talents: Talent[];

    @BelongsToMany(()=>Fight, ()=> CreatureFight)
    fights: Fight[];

    @BelongsToMany(()=>Group, ()=> CreatureGroup)
    groups: Group[];

    @BeforeCreate
    @BeforeUpdate
    static setKmbKmv(instance:Creature) {
        instance.kmb = instance.getKMB();
        instance.kmv = instance.getKMV();
        instance.sizemod = instance.getModForSizeForKM();
    }

    /**
     * @return {int}
     */
    getKMB() {
        let size = this.size.toLowerCase().trim();
        if (size === "klein" || size === "sehr klein" || size === "winzig" || size === "mini") {
            // @ts-ignore
            return this.baseAtk + this.getModForStat(this.get('stats').dex) + this.getModForSizeForKM()
        }

        // @ts-ignore
        return this.baseAtk + this.getModForStat(this.stats.str) + this.getModForSizeForKM()
    }

    getKMV() {
        // @ts-ignore
        return this.baseAtk + this.getModForStat(this.get('stats').str) +
            // @ts-ignore
            this.getModForStat(this.get('stats').dex) + this.getModForSizeForKM()
    }

    /**
     *
     * @param {int} attr
     * @returns {number}
     */
    getModForStat(attr) {
        return (Math.floor(attr / 2)) - 5
    }

    /**
     *
     * @returns {int}
     */
    getModForSizeForKM() {
        let size_adjusted = this.size.toLowerCase().trim();
        switch (size_adjusted) {
            case "colossal":
                return 8;
            case "gargantuan":
                return 4;
            case "huge":
                return 2;
            case "large":
                return 1;
            case "medium":
                return 0;
            case "small":
                return -1;
            case "tiny":
                return -2;
            case "diminutive":
                return -4;
            case "fine":
                return -8;
            default:
                return 99;
        }
    }
}


