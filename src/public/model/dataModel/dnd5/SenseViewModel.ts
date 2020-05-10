export class SenseViewModel {
    private _name: string;
    private _value: string;
    constructor(
        name: string,
        value: string
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

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }
}