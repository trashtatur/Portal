import {DND5SpellViewModel} from "@/public/model/dnd5/DND5SpellViewModel";

export class DND5InnateSpellViewModel {
    private _spell: DND5SpellViewModel;
    private _times: number;
    private _per: "day" | "at will";
    private _constraint?: string;
    constructor(
        spell: DND5SpellViewModel,
        times: number,
        per: "day" | "at will",
        constraint?: string,
    ) {
        this._spell = spell;
        this._times = times;
        this._per = per;
        this._constraint = constraint;
    }

    get spell(): DND5SpellViewModel {
        return this._spell;
    }

    set spell(value: DND5SpellViewModel) {
        this._spell = value;
    }

    get times(): number {
        return this._times;
    }

    set times(value: number) {
        this._times = value;
    }

    get per(): "day" | "at will" {
        return this._per;
    }

    set per(value: "day" | "at will") {
        this._per = value;
    }

    get constraint(): string {
        return this._constraint;
    }

    set constraint(value: string) {
        this._constraint = value;
    }
}