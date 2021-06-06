import * as React from 'react';
import {ReactNode} from 'react';
import * as generalStyle from "@/public/view/components/module-battle/dnd5/creatureForm/components/formSectionGeneralStyles.css";
import ReactSwitch from "react-switch";
import {SpellsWithSlotsFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/components/spellsWithSlotFormSection/SpellsWithSlotsFormSection";
import {InnateSpellCastingFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/components/innateSpellCastingFormSection/InnateSpellCastingFormSection";
import {DND5SpellViewModel} from "@/public/model/dnd5/DND5SpellViewModel";
import {DND5InnateSpellCollection} from "@/public/model/dnd5/DND5InnateSpellCollection";
import {httpGet} from "@/public/service/http.service";
import {sortSpellsBySpellLevel} from "@/public/service/dnd5/spellSorting.service";
import {deserializeMultiple} from "@/public/service/serializer.service";

interface SpellsFormSectionProps {
    handleAddSlotSpell: Function;
    handleAddInnateSpell: Function;
    handleRemoveSlotSpell: Function;
    handleRemoveInnateSpell: Function;
    chosenSlotSpells: DND5SpellViewModel[];
    chosenInnateSpells: DND5InnateSpellCollection;
    shouldDisplaySpellsSection: boolean;
    shouldDisplaySpellsWithSlotsSection: boolean;
    shouldDisplaySwitchForInnateSpellCasting: boolean;
}

interface SpellsFormSectionState {
    shouldDisplayInnateSpellCastingSection: boolean;
    innateSpellsToChooseFrom: DND5SpellViewModel[];
    slotSpellsToChooseFrom: DND5SpellViewModel[];
}

export class SpellsFormSection extends React.Component<SpellsFormSectionProps, SpellsFormSectionState> {
    constructor(props) {
        super(props);
        this.state = {
            shouldDisplayInnateSpellCastingSection: false,
            innateSpellsToChooseFrom: [],
            slotSpellsToChooseFrom: [],
        }
    }

    componentDidMount = async(): Promise<void> => {
        try {
            const spellData = await httpGet('/V1/DND5/Spell');
            const spellModels = deserializeMultiple(spellData, DND5SpellViewModel);
            const mappedInnateSpells = sortSpellsBySpellLevel(spellModels);
            this.setState({innateSpellsToChooseFrom: mappedInnateSpells})
            const mappedSlotSpells = sortSpellsBySpellLevel(spellModels);
            this.setState({slotSpellsToChooseFrom: mappedSlotSpells})
        } catch (e) {
            console.log(e)
        }
    }

    handleDisplayInnateSpellCasting = (value: boolean): void => {
        this.setState({shouldDisplayInnateSpellCastingSection: value})
    }

    handleAddInnateSpellToChoice = (spell: DND5SpellViewModel): void => {
        this.setState({
            innateSpellsToChooseFrom: sortSpellsBySpellLevel(
                this.state.innateSpellsToChooseFrom.concat([spell])
            )
        });
    }

    handleAddSlotSpellToChoice = (spell: DND5SpellViewModel): void => {
        this.setState({
            slotSpellsToChooseFrom: sortSpellsBySpellLevel(
                this.state.slotSpellsToChooseFrom.concat([spell])
            )
        });
    }

    handleRemoveInnateSpellFromChoice = (spellId: string): void => {
        this.setState({innateSpellsToChooseFrom: this.state.innateSpellsToChooseFrom.filter(spell => spell.id !== spellId)});
    }

    handleRemoveSlotSpellFromChoice = (spellId: string): void => {
        this.setState({slotSpellsToChooseFrom: this.state.slotSpellsToChooseFrom.filter(spell => spell.id !== spellId)});

    }

    render(): ReactNode {
        return (
            <>
                {
                    this.props.shouldDisplaySwitchForInnateSpellCasting &&
                    this.props.shouldDisplaySpellsSection &&
                    <div className={generalStyle.formInputSection}>
                        <label>Uses innate spell casting?</label>
                        <ReactSwitch
                            checked={this.state.shouldDisplayInnateSpellCastingSection}
                            onChange={this.handleDisplayInnateSpellCasting}
                            onColor={'#19803f'}
                        />
                    </div>
                }
                {
                    this.props.shouldDisplaySpellsSection &&
                    this.props.shouldDisplaySpellsWithSlotsSection &&
                    <SpellsWithSlotsFormSection
                        addSpell={this.props.handleAddSlotSpell}
                        removeSpell={this.props.handleRemoveSlotSpell}
                        chosenSpells={this.props.chosenSlotSpells}
                        addSpellsToChoice={this.handleAddSlotSpellToChoice}
                        removeSpellFromChoice={this.handleRemoveSlotSpellFromChoice}
                        spellsToChooseFrom={this.state.slotSpellsToChooseFrom}
                    />
                }
                {
                    this.state.shouldDisplayInnateSpellCastingSection &&
                    <InnateSpellCastingFormSection
                        innateSpellsToChooseFrom={this.state.innateSpellsToChooseFrom}
                        chosenInnateSpells={this.props.chosenInnateSpells}
                        addInnateSpell={this.props.handleAddInnateSpell}
                        removeInnateSpell={this.props.handleRemoveInnateSpell}
                        addInnateSpellToChoice={this.handleAddInnateSpellToChoice}
                        removeInnateSpellFromChoice={this.handleRemoveInnateSpellFromChoice}
                    />
                }
            </>
        )
    }
}