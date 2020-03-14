import {DamageTypesEnum} from "./DamageTypesEnum";

export class DamageType {
    private _damageType: DamageTypesEnum[];
    private _isMagic: boolean;

    constructor(
        damageTypes: DamageTypesEnum[],
        isMagic: boolean
    ) {
        this._damageType = damageTypes;
        this._isMagic = isMagic;
    }

    get damageType(): DamageTypesEnum[] {
        return this._damageType;
    }

    set damageType(value: DamageTypesEnum[]) {
        this._damageType = value;
    }

    get isMagic(): boolean {
        return this._isMagic;
    }

    set isMagic(value: boolean) {
        this._isMagic = value;
    }
}