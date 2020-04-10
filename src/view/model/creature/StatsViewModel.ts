import {statblock} from "../../components/componentTypes";
import {getSizeModFromSizeEnum} from "../dataModel/CreatureSizeModifierEnum";
import {CreatureSizesEnum} from "../dataModel/CreatureSizesEnum";

export class StatsViewModel {

    BASE_CMD_BONUS = 10;

    LABELS = {
        STR: "STR",
        CON: "CON",
        WIS: "WIS",
        INT: "INT",
        CHA: "CHA",
        DEX: "DEX",
        CMB: "CMB",
        CMD: "CMD"
    };
    private _dexterity: number;
    private _strength: number;
    private _constitution: number;
    private _wisdom: number;
    private _intelligence: number;
    private _charisma: number;
    private readonly _creatureSize: CreatureSizesEnum;
    private readonly _baseAttack: number;

    constructor(stats: statblock, creatureSize: CreatureSizesEnum, baseAttack: number) {
        this._baseAttack = baseAttack;
        this._strength = stats.str;
        this._constitution = stats.con;
        this._wisdom = stats.wis;
        this._intelligence = stats.int;
        this._charisma = stats.cha;
        this._dexterity = stats.dex;
        this._creatureSize = creatureSize;
    }

    get dexterity(): number {
        return this._dexterity;
    }

    set dexterity(value: number) {
        this._dexterity = value;
    }

    get strength(): number {
        return this._strength;
    }

    set strength(value: number) {
        this._strength = value;
    }

    get constitution(): number {
        return this._constitution;
    }

    set constitution(value: number) {
        this._constitution = value;
    }

    get wisdom(): number {
        return this._wisdom;
    }

    set wisdom(value: number) {
        this._wisdom = value;
    }

    get intelligence(): number {
        return this._intelligence;
    }

    set intelligence(value: number) {
        this._intelligence = value;
    }

    get charisma(): number {
        return this._charisma;
    }

    set charisma(value: number) {
        this._charisma = value;
    }

    getAsString = (attributeToGet: string): string => {
        switch (attributeToGet) {
            case this.LABELS.STR:
                return this._strength.toString();
            case this.LABELS.CHA:
                return this._charisma.toString();
            case this.LABELS.CON:
                return this._constitution.toString();
            case this.LABELS.INT:
                return this._intelligence.toString();
            case this.LABELS.WIS:
                return this._wisdom.toString();
            case this.LABELS.DEX:
                return this.LABELS.DEX.toString();
        }
    };

    getCMD = (): number => {
        return this._baseAttack + this.getModForStat(this.strength) +
            this.getModForStat(this.dexterity) + getSizeModFromSizeEnum(this._creatureSize) + this.BASE_CMD_BONUS;
    };

    getCMB = (): number => {
        if (typeof this._baseAttack === 'string'
            || typeof this._strength === 'string'
            || typeof this._dexterity === 'string'
            || this._creatureSize === ''
        ) {
            return 0;
        }
        if (this._creatureSize === CreatureSizesEnum.SMALL
            || this._creatureSize === CreatureSizesEnum.TINY
            || this._creatureSize === CreatureSizesEnum.DIMINUTIVE
            || this._creatureSize === CreatureSizesEnum.FINE) {
            return this._baseAttack + this.getModForStat(this._dexterity) + getSizeModFromSizeEnum(this._creatureSize)
        }
        return this._baseAttack
            + this.getModForStat(this.strength)
            + getSizeModFromSizeEnum(this._creatureSize)
    };

    /**
     * @private
     */
    getModForStat = (attr): number => {
        return (Math.floor(attr / 2)) - 5
    };

    returnStatMod = (statValue: number): string => {
        const mod = (Math.floor(statValue / 2)) - 5;
        if (mod >= 0) return `+${mod}`;
        return `${mod}`
    };
}