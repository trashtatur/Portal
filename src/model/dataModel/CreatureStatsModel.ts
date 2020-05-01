export class CreatureStatsModel {
    private readonly _strength: number;
    private readonly _dexterity: number;
    private readonly _constitution: number;
    private readonly _intelligence: number;
    private readonly _wisdom: number;
    private readonly _charisma: number;

    constructor(
        strength: number,
        dexterity: number,
        constitution: number,
        intelligence: number,
        wisdom: number,
        charisma: number,
    ) {
        this._strength = strength;
        this._dexterity = dexterity;
        this._constitution = constitution;
        this._intelligence = intelligence;
        this._wisdom = wisdom;
        this._charisma = charisma;
    }

    get strength(): number {
        return this._strength;
    }

    get dexterity(): number {
        return this._dexterity;
    }

    get constitution(): number {
        return this._constitution;
    }

    get intelligence(): number {
        return this._intelligence;
    }

    get wisdom(): number {
        return this._wisdom;
    }

    get charisma(): number {
        return this._charisma;
    }
}