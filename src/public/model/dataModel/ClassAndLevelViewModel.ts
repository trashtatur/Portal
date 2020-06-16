import {AbstractEffectViewModel} from "@/public/model/effects/AbstractEffectViewModel";
import {ApplyEffects } from "@/public/model/effects/decorator/DecoratorFunctions";

export class ClassAndLevelViewModel extends AbstractEffectViewModel{
    private _name: string;
    private _level: number;
    constructor(
        name: string,
        level: number
    ) {
        super()
        this._name = name;
        this._level = level;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    @ApplyEffects
    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }
}