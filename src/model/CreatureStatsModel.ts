import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class CreatureStatsModel {
    @JsonProperty({name: 'strength'})
    private readonly _strength: number;
    @JsonProperty({name: 'dexterity'})
    private readonly _dexterity: number;
    @JsonProperty({name: 'constitution'})
    private readonly _constitution: number;
    @JsonProperty({name: 'intelligence'})
    private readonly _intelligence: number;
    @JsonProperty({name: 'wisdom'})
    private readonly _wisdom: number;
    @JsonProperty({name: 'charisma'})
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