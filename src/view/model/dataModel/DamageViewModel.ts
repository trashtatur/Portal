export class DamageViewModel {
    private _diceCount: number;
    private _diceType: number;

    constructor(
    ) {
        this._diceCount = null;
        this._diceType = null;
    }

    get diceCount(): number {
        return this._diceCount;
    }

    set diceCount(value: number) {
        this._diceCount = value;
    }

    get diceType(): number {
        return this._diceType;
    }

    set diceType(value: number) {
        this._diceType = value;
    }

    getFormattedDiceType(): string {
        if (this._diceType == null) {
            return ''
        }
        return String(this._diceType);
    }

    getFormattedDiceCount(): string {
        if (this._diceCount == null) {
            return ''
        }
        return String(this._diceCount)
    }
}