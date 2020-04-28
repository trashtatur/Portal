import {ModelInterface} from "../ModelInterface";

export class PathfinderLanguageModel implements ModelInterface {
    private readonly _name: string;

    constructor(
        id: string,
        name: string,
    ) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }
}