import * as React from 'react';
import {ReactNode} from 'react';
import {DND5SpellViewModel} from "@/public/model/dnd5/DND5SpellViewModel";
import {InnateSpellViewModel} from "@/public/model/dataModel/dnd5/InnateSpellViewModel";
import {InnateSpellCollection} from "@/public/model/dataModel/dnd5/InnateSpellCollection";

interface InnateSpellCastingFormSectionProps {
    innateSpellsToChooseFrom: DND5SpellViewModel[];
    chosenInnateSpells: InnateSpellCollection;
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