export class ClassAndLevelModel {
    private readonly _className: string;
    private readonly _level: number;

    constructor(
        className: string,
        level: number
    ) {
        this._className = className;
        this._level = level;
    }

    get className(): string {
        return this._className;
    }

    get level(): number {
        return this._level;
    }
}