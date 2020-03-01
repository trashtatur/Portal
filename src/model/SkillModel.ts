import {ModelInterface} from "./ModelInterface";

export class SkillModel implements ModelInterface {
    private readonly _name: string;
    private readonly _level: number;

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

    get level(): number {
        return this._level;
    }
}