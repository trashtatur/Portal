export class Effect {
    private _will: "add" | "subtract";
    private _name: string;
    private _amount: number;
    private _from: string;
    constructor(
        name: string,
        will: "add" | "subtract",
        amount: number,
        from: string
    ) {
        this._name = name;
        this._will = will;
        this._amount = amount;
        this._from = from;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get will(): "add" | "subtract" {
        return this._will;
    }

    set will(value: "add" | "subtract") {
        this._will = value;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }

    get from(): string {
        return this._from;
    }

    set from(value: string) {
        this._from = value;
    }

    applyEffect = (value: number): number => {
        if (this.will === "subtract") {
            return value - this._amount
        }
        if (this.will === "add") {
            return value + this._amount
        }
    }
}