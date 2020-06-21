import {getSizeModFromSizeEnum} from "../../enumeration/pathfinder/PathfinderCreatureSizeModifierEnum";
import {PathfinderCreatureSizeEnum} from "../../enumeration/pathfinder/PathfinderCreatureSizeEnum";
import {ApplyEffects} from "@/public/model/effects/decorator/DecoratorFunctions";

export class PathfinderStatsViewModel {

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
    private _creatureSize: PathfinderCreatureSizeEnum;
    private _baseAttack: number;

    constructor(
        str: number,
        con: number,
        wis: number,
        int: number,
        cha: number,
        dex: number,
        creatureSize: PathfinderCreatureSizeEnum,
        baseAttack: number
    ) {
        this._baseAttack = baseAttack;
        this._strength = str;
        this._constitution = con;
        this._wisdom = wis;
        this._intelligence = int;
        this._charisma = cha;
        this._dexterity = dex;
        this._creatureSize = creatureSize;
    }

    @ApplyEffects
    get dexterity(): number {
        return this._dexterity;
    }

    set dexterity(value: number) {
        this._dexterity = value;
    }

    @ApplyEffects
    get strength(): number {
        return this._strength;
    }

    set strength(value: number) {
        this._strength = value;
    }

    @ApplyEffects
    get constitution(): number {
        return this._constitution;
    }

    set constitution(value: number) {
        this._constitution = value;
    }

    @ApplyEffects
    get wisdom(): number {
        return this._wisdom;
    }

    set wisdom(value: number) {
        this._wisdom = value;
    }

    @ApplyEffects
    get intelligence(): number {
        return this._intelligence;
    }

    set intelligence(value: number) {
        this._intelligence = value;
    }

    @ApplyEffects
    get charisma(): number {
        return this._charisma;
    }

    set charisma(value: number) {
        this._charisma = value;
    }

    set baseAttack(value: number) {
        this._baseAttack = value;
    }

    set creatureSize(value: PathfinderCreatureSizeEnum) {
        this._creatureSize = value;
    }

    getAsString = (attributeToGet: string): string => {
        switch (attributeToGet) {
            case this.LABELS.STR:
                return this.strength.toString();
            case this.LABELS.CHA:
                return this.charisma.toString();
            case this.LABELS.CON:
                return this.constitution.toString();
            case this.LABELS.INT:
                return this.intelligence.toString();
            case this.LABELS.WIS:
                return this.wisdom.toString();
            case this.LABELS.DEX:
                return this.dexterity.toString();
        }
    };

    getCMD = (): string => {
        const cmd = this._baseAttack + this.getModForStat(this.strength) +
            this.getModForStat(this.dexterity) + getSizeModFromSizeEnum(this._creatureSize) + this.BASE_CMD_BONUS;
        if (cmd > 0) return `${cmd}`
        return `-${cmd}`
    };

    getCMB = (): string => {
        if (typeof this._baseAttack === 'string'
            || typeof this._strength === 'string'
            || typeof this._dexterity === 'string'
            || this._creatureSize === ''
        ) {
            return `0`;
        }
        if (this._creatureSize === PathfinderCreatureSizeEnum.SMALL
            || this._creatureSize === PathfinderCreatureSizeEnum.TINY
            || this._creatureSize === PathfinderCreatureSizeEnum.DIMINUTIVE
            || this._creatureSize === PathfinderCreatureSizeEnum.FINE) {
            const cmb = this._baseAttack + this.getModForStat(this._dexterity) + getSizeModFromSizeEnum(this._creatureSize)
            if (cmb > 0) return `${cmb}`
            return `-${cmb}`
        }
        const cmb = this._baseAttack + this.getModForStat(this.strength) + getSizeModFromSizeEnum(this._creatureSize)
        if (cmb > 0) return `${cmb}`
        return `-${cmb}`
    };

    getModForStat = (attr: number): number => {
        return (Math.floor(attr / 2)) - 5
    };
}