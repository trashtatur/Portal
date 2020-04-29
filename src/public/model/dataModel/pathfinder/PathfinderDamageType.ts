import {DamageTypesEnum} from "../../enumeration/DamageTypesEnum";

export class DamageType {
    private _damageType: DamageTypesEnum[];
    private _isHybrid: boolean;
    private _isMagic: boolean;

    constructor(
        damageTypes: DamageTypesEnum[],
        isMagic: boolean,
        isHybrid: boolean
    ) {
        this._damageType = damageTypes;
        this._isMagic = isMagic;
        this._isHybrid = isHybrid;
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

    get isHybrid(): boolean {
        return this._isHybrid;
    }

    set isHybrid(value: boolean) {
        this._isHybrid = value;
    }

    getFullDamageTypeString = (): string => {
        let string = '';
        if (this._isHybrid) {
            string += '(hybrid) '
        }
        if (this._isMagic) {
            string += '(magic) '
        }
        string += this._damageType.join(', ')
        return string;
    }
}