import {
    AllowNull, AutoIncrement,
    BelongsToMany,
    Column,
    DataType, Is,
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
import {printRoutes} from "@tsed/common";
import contains = require("validator/lib/contains");

@Table
export class Creature extends Model<Creature> {


    @PrimaryKey
    @Column({type:DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid:string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    hitpoints: number;

    @AllowNull(true)
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

    @Is('stats', value => {
        if (typeof value == "object") {
            let val_keys = Object.keys(value).map(val => {return val.toLowerCase()});
            const testlist = ["str","dex","wis","int","ch","con"];
            if (JSON.stringify(testlist.sort()) == JSON.stringify(val_keys.sort())) {
                let check = Object.values(value).filter(val => {
                    if (typeof val == "number") return val;
                });
                if (check.length != Object.values(value).length) {
                    throw Error(`At least value in the stat map (${JSON.stringify(value)}) is not a number`)
                }
            } else {
                throw Error(`The provided stat map (${JSON.stringify(value)}) does not have all keys`)
            }
        } else {
            throw Error(`The provided stat map (${JSON.stringify(value)}) is not a proper JSON map`)
        }
    })
    @Column(DataType.JSON)
    get stats(): object {
        // @ts-ignore
        return JSON.parse(this.getDataValue('stats'))
    }

    set stats(value) {
        // @ts-ignore
        this.setDataValue('stats', value);
    }


    @Is('saveThrows', value => {
        if (typeof value == "object") {
            let val_keys = Object.keys(value).map(val => {return val.toLowerCase()});
            const testlist = ["ref","will","fort"];
            if (JSON.stringify(testlist.sort()) == JSON.stringify(val_keys.sort())) {
                let check = Object.values(value).filter(val => {
                    if (typeof val == "number") return val;
                });
                if (check.length != Object.values(value).length) {
                    throw Error(`At least value in the save throws map (${JSON.stringify(value)}) is not a number`)
                }
            } else {
                throw Error(`The provided save throws map (${JSON.stringify(value)}) does not have all keys`)
            }
        } else {
            throw Error(`The provided save throws map (${JSON.stringify(value)}) is not a proper JSON map`)
        }
    })
    @Column(DataType.JSON)
    get saveThrows(): string[] {
        // @ts-ignore
        return this.getDataValue('saveThrows').split(',')
    }

    set saveThrows(val) {
        this.setDataValue('saveThrows', val);
    }

    @AllowNull(true)
    @Column
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
            case "kolossal":
                return 8;
            case "gigantisch":
                return 4;
            case "riesig":
                return 2;
            case "groß":
                return 1;
            case "mittelgroß":
                return 0;
            case "klein":
                return -1;
            case "sehr klein":
                return -2;
            case "winzig":
                return -4;
            case "mini":
                return -8;
            default:
                return 0;
        }
    }
}


