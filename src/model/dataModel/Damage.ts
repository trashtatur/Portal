export class Damage {
    private readonly _diceCount: number;
    private readonly _diceType: number;
    private readonly _bonus: number;

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

    get diceType(): number {
        return this._diceType;
    }

    get bonus(): number {
        return this._bonus;
    }

    getDamageString(): string {
        let bonusIndicator = '';
        if (this._bonus) {
            if (this._bonus > 0) {
                bonusIndicator = '+'
            }
            return `${this._diceCount}d${this.diceType}${bonusIndicator}${this._bonus}`
        }
        return `${this._diceCount}d${this.diceType}`
    }
}