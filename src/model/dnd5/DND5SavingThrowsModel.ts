import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class DND5SavingThrowsModel{
    @JsonProperty({name: 'strengthSave'})
    private readonly _strengthSave?: number;
    @JsonProperty({name: 'dexteritySave'})
    private readonly _dexteritySave?: number;
    @JsonProperty({name: 'constitutionSave'})
    private readonly _constitutionSave?: number;
    @JsonProperty({name: 'intelligenceSave'})
    private readonly _intelligenceSave?: number;
    @JsonProperty({name: 'wisdomSave'})
    private readonly _wisdomSave?: number;
    @JsonProperty({name: 'charismaSave'})
    private readonly _charismaSave?: number;

    constructor(
        strengthSave?: number,
        dexteritySave?: number,
        constitutionSave?: number,
        intelligenceSave?: number,
        wisdomSave?: number,
        charismaSave?: number,
    ) {
        this._strengthSave = strengthSave;
        this._dexteritySave = dexteritySave;
        this._constitutionSave = constitutionSave;
        this._intelligenceSave = intelligenceSave;
        this._wisdomSave = wisdomSave;
        this._charismaSave = charismaSave;
    }

    get strengthSave(): number {
        return this._strengthSave;
    }

    get dexteritySave(): number {
        return this._dexteritySave;
    }

    get constitutionSave(): number {
        return this._constitutionSave;
    }

    get intelligenceSave(): number {
        return this._intelligenceSave;
    }

    get wisdomSave(): number {
        return this._wisdomSave;
    }

    get charismaSave(): number {
        return this._charismaSave;
    }
}