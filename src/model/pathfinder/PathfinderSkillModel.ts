import {ModelInterface} from "../ModelInterface";

export class PathfinderSkillModel implements ModelInterface {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _level: number;

    constructor(
        id: string,
        name: string,
        level: number
    ) {
        this._id = id;
        this._name = name;
        this._level = level;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get level(): number {
        return this._level;
    }
}