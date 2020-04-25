export class DamageViewModel {
    private _diceCount: number;
    private _bonus?: number;
    private _diceType: number;

    constructor(
        diceCount: number,
        diceType: number,
        bonus?: number
    ) {
        this._diceCount = diceCount;
        this._diceType = diceType;
        this._bonus = bonus;
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

    get bonus(): number {
        return this._bonus;
    }

    set bonus(value: number) {
        this._bonus = value;
    }

    getFormattedDiceType(): string {
        if (this._diceType == null) {
            return '';
        }
        return String(this._diceType);
    }

    getFormattedDiceCount(): string {
        if (this._diceCount == null) {
            return '';
        }
        return String(this._diceCount)
    }

    getFormattedDiceBonus(): string {
        if (this._bonus == null) {
            return '';
        }
        return String(this._bonus)
    }

    getFullDamageString(): string {
        if (!this.bonus) {
            return `${this.diceCount}d${this.diceType}`
        }
        if (this.bonus && this.bonus > 0) {
            return `${this.diceCount}d${this.diceType}+${this.bonus}`
        }
        return `${this.diceCount}d${this.diceType}${this.bonus}`
    }

}