export class ClassAndLevelViewModel {
    private _name: string;
    private _level: number;
    constructor(
        name: string,
        level: number
    ) {
        this._name = name;
        this._level = level;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }
}