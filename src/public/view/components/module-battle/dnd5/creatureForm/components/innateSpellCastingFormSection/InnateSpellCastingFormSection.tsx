import * as React from 'react';
import {ReactNode} from 'react';
import {DND5SpellViewModel} from "@/public/model/dnd5/DND5SpellViewModel";
import {DND5InnateSpellViewModel} from "@/public/model/dnd5/DND5InnateSpellViewModel";
import {DND5InnateSpellCollection} from "@/public/model/dnd5/DND5InnateSpellCollection";

interface InnateSpellCastingFormSectionProps {
    innateSpellsToChooseFrom: DND5SpellViewModel[];
    chosenInnateSpells: DND5InnateSpellCollection;
    addInnateSpell: Function;
    removeInnateSpell: Function;
    addInnateSpellToChoice: Function;
    removeInnateSpellFromChoice: Function;
}

interface InnateSpellCastingFormSectionState {

}

export class InnateSpellCastingFormSection extends React.Component<InnateSpellCastingFormSectionProps, InnateSpellCastingFormSectionState> {

    render(): ReactNode {
        return (
            <>
            </>
        )
    }
}