export class SenseViewModel {
    private _name: string;
    private _value: number;
    constructor(
        name: string,
        value: number
    ) {
        this._name = name;
        this._value = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }
}