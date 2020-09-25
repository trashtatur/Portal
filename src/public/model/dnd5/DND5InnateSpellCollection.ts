import {DND5InnateSpellViewModel} from "@/public/model/dnd5/DND5InnateSpellViewModel";

export class DND5InnateSpellCollection {
    private _innateSpells: DND5InnateSpellViewModel[];
    private _spellAttribute: "strength" | "dexterity" | "constitution" | "intelligence" | "wisdom" | "charisma";
    private _constraint?: string;

    constructor(
        innateSpells: DND5InnateSpellViewModel[],
        spellAttribute: "strength" | "dexterity" | "constitution" | "intelligence" | "wisdom" | "charisma",
        constraint?: string
    ) {
        this._innateSpells = innateSpells;
        this._spellAttribute = spellAttribute;
        this._constraint = constraint;
    }

    addInnateSpell = (spell: DND5InnateSpellViewModel): void => {
        this._innateSpells = this._innateSpells.concat(spell);
    }

    removeInnateSpell = (spell: DND5InnateSpellViewModel): void => {
        this._innateSpells = this._innateSpells.filter(innate => innate.spell.id !== spell.spell.id);
    }

    get innateSpells(): DND5InnateSpellViewModel[] {
        return this._innateSpells;
    }

    set innateSpells(value: DND5InnateSpellViewModel[]) {
        this._innateSpells = value;
    }

    get spellAttribute(): "strength" | "dexterity" | "constitution" | "intelligence" | "wisdom" | "charisma" {
        return this._spellAttribute;
    }

    set spellAttribute(value: "strength" | "dexterity" | "constitution" | "intelligence" | "wisdom" | "charisma") {
        this._spellAttribute = value;
    }

    get constraint(): string {
        return this._constraint;
    }

    set constraint(value: string) {
        this._constraint = value;
    }
}