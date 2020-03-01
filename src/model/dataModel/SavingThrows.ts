export class SavingThrows {
    private readonly _reflex: number;
    private readonly _wisdom: number;
    private readonly _fortitude: number;

    constructor(
        reflex: number,
        wisdom: number,
        fortitude: number
    ) {
        this._reflex = reflex;
        this._wisdom = wisdom;
        this._fortitude = fortitude;
    }

    get reflex(): number {
        return this._reflex;
    }

    get wisdom(): number {
        return this._wisdom;
    }

    get fortitude(): number {
        return this._fortitude;
    }
}