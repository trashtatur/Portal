import {AbstractEffectViewModel} from "@/public/model/effects/AbstractEffectViewModel";

export class DND5CreatureStatsViewModel extends AbstractEffectViewModel{
    private _strength: number;
    private _dexterity: number;
    private _constitution: number;
    private _intelligence: number;
    private _wisdom: number;
    private _charisma: number;

    constructor(
        strength: number,
        dexterity: number,
        constitution: number,
        intelligence: number,
        wisdom: number,
        charisma: number,
    ) {
        super()
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

    set strength(value: number) {
        this._strength = value;
    }

    get dexterity(): number {
        return this._dexterity;
    }

    set dexterity(value: number) {
        this._dexterity = value;
    }

    get constitution(): number {
        return this._constitution;
    }

    set constitution(value: number) {
        this._constitution = value;
    }

    get intelligence(): number {
        return this._intelligence;
    }

    set intelligence(value: number) {
        this._intelligence = value;
    }

    get wisdom(): number {
        return this._wisdom;
    }

    set wisdom(value: number) {
        this._wisdom = value;
    }

    get charisma(): number {
        return this._charisma;
    }

    set charisma(value: number) {
        this._charisma = value;
    }

    getStatModifierForStatValue = (statValue: number): number => {
        return Math.floor((statValue - 10) / 2);
    }
}