import {ApplyEffects } from "@/public/model/status/decorator/DecoratorFunctions";
import {ClassesEnum} from "@/public/model/enumeration/dnd5/ClassesEnum";
import {StatusEffectAware} from "@/public/model/status/StatusEffectAware";

export class ClassAndLevelViewModel extends StatusEffectAware{
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