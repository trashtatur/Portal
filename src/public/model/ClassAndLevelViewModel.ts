import {AbstractEffectViewModel} from "@/public/model/effects/AbstractEffectViewModel";
import {ApplyEffects } from "@/public/model/effects/decorator/DecoratorFunctions";
import {ClassesEnum} from "@/public/model/enumeration/dnd5/ClassesEnum";

export class ClassAndLevelViewModel extends AbstractEffectViewModel{
    private _name: ClassesEnum;
    private _subclass?: string;
    private _level: number;
    constructor(
        name: ClassesEnum,
        level: number,
        subclass?: string
    ) {
        super()
        this._subclass = subclass;
        this._name = name;
        this._level = level;
    }

    get name(): ClassesEnum {
        return this._name;
    }

    set name(value: ClassesEnum) {
        this._name = value;
    }

    @ApplyEffects
    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }

    get subclass(): string {
        return this._subclass;
    }

    set subclass(value: string) {
        this._subclass = value;
    }
}