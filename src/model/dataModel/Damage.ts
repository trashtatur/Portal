export class Damage {
    private readonly _diceCount: number;
    private readonly _diceType: number;

    constructor(
        diceCount: number,
        diceType: number
    ) {
        this._diceCount = diceCount;
        this._diceType = diceType;
    }

    get diceCount(): number {
        return this._diceCount;
    }

    get diceType(): number {
        return this._diceType;
    }
}