import {DamageTypesEnum} from "../enumeration/DamageTypesEnum";

export class DamageType {
    private readonly _damageTypes: DamageTypesEnum[];
    private readonly _isMagic: boolean;
    private readonly _isHybrid: boolean;
    constructor(
        damageTypes: DamageTypesEnum[],
        isMagic: boolean,
        isHybrid: boolean
    ) {
        this._damageTypes = damageTypes;
        this._isMagic = isMagic;
        this._isHybrid = isHybrid;
    }

    get damageTypes(): DamageTypesEnum[] {
        return this._damageTypes;
    }

    get isMagic(): boolean {
        return this._isMagic;
    }

    getDamageTypesString(): string {
        let damageTypesString = '';
        if (this._isHybrid) {
            damageTypesString = '(hybrid) ';
        }
        if (this._isMagic) {
            damageTypesString += '(magic) ';
        }
        damageTypesString += this._damageTypes.join(', ');
        return damageTypesString;
    }
}