export class DND5SpellSlotsModel {
    private readonly _first: number;
    private readonly _second: number;
    private readonly _third: number;
    private readonly _fourth: number;
    private readonly _fifth: number;
    private readonly _sixth: number;
    private readonly _seventh: number;
    private readonly _eighth: number;
    private readonly _ninth: number;
    private readonly _cantrips: string;

    constructor(
        first: number,
        second: number,
        third: number,
        fourth: number,
        fifth: number,
        sixth: number,
        seventh: number,
        eighth: number,
        ninth: number,
        cantrips = 'infinity',
    ) {
        this._first = first;
        this._second = second;
        this._third = third;
        this._fourth = fourth;
        this._fifth = fifth;
        this._sixth = sixth;
        this._seventh = seventh;
        this._eighth = eighth;
        this._ninth = ninth;
        this._cantrips = cantrips;
    }


    get first(): number {
        return this._first;
    }

    get second(): number {
        return this._second;
    }

    get third(): number {
        return this._third;
    }

    get fourth(): number {
        return this._fourth;
    }

    get fifth(): number {
        return this._fifth;
    }

    get sixth(): number {
        return this._sixth;
    }

    get seventh(): number {
        return this._seventh;
    }

    get eighth(): number {
        return this._eighth;
    }

    get ninth(): number {
        return this._ninth;
    }

    get cantrips(): string {
        return this._cantrips;
    }
}