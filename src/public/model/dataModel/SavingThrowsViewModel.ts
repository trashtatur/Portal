export class SavingThrowsViewModel {
    private _reflex: number;
    private _wisdom: number;
    private _fortitude: number;

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

    set reflex(value: number) {
        this._reflex = value;
    }

    get wisdom(): number {
        return this._wisdom;
    }

    set wisdom(value: number) {
        this._wisdom = value;
    }

    get fortitude(): number {
        return this._fortitude;
    }

    set fortitude(value: number) {
        this._fortitude = value;
    }
}