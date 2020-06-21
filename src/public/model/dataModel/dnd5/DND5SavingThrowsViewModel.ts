import {AbstractEffectViewModel} from "@/public/model/effects/AbstractEffectViewModel";
import {ApplyEffects} from "@/public/model/effects/decorator/DecoratorFunctions";

export class DND5SavingThrowsViewModel extends AbstractEffectViewModel{
    private readonly _strengthSave?: number;
    private readonly _dexteritySave?: number;
    private readonly _constitutionSave?: number;
    private readonly _intelligenceSave?: number;
    private readonly _wisdomSave?: number;
    private readonly _charismaSave?: number;

    constructor(
        strengthSave?: number,
        dexteritySave?: number,
        constitutionSave?: number,
        intelligenceSave?: number,
        wisdomSave?: number,
        charismaSave?: number,
    ) {
        super();
        this._strengthSave = strengthSave;
        this._dexteritySave = dexteritySave;
        this._constitutionSave = constitutionSave;
        this._intelligenceSave = intelligenceSave;
        this._wisdomSave = wisdomSave;
        this._charismaSave = charismaSave;
    }

    @ApplyEffects
    get strengthSave(): number {
        return this._strengthSave;
    }

    @ApplyEffects
    get dexteritySave(): number {
        return this._dexteritySave;
    }

    @ApplyEffects
    get constitutionSave(): number {
        return this._constitutionSave;
    }

    @ApplyEffects
    get intelligenceSave(): number {
        return this._intelligenceSave;
    }

    @ApplyEffects
    get wisdomSave(): number {
        return this._wisdomSave;
    }

    @ApplyEffects
    get charismaSave(): number {
        return this._charismaSave;
    }
}