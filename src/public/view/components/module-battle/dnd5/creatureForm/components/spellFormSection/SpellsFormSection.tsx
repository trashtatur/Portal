import * as React from 'react';
import {ReactNode} from 'react';
import * as generalStyle from "@/public/view/components/module-battle/dnd5/creatureForm/components/formSectionGeneralStyles.css";
import ReactSwitch from "react-switch";
import {SpellsWithSlotsFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/components/spellsWithSlotFormSection/SpellsWithSlotsFormSection";
import {InnateSpellCastingFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/components/innateSpellCastingFormSection/InnateSpellCastingFormSection";
import {DND5SpellViewModel} from "@/public/model/dnd5/DND5SpellViewModel";
import {DND5InnateSpellCollection} from "@/public/model/dnd5/DND5InnateSpellCollection";
import {HttpService} from "@/public/service/HttpService";
import {SpellSortingService} from "@/public/service/dnd5/SpellSortingService";
import {DND5SpellDataToViewModelMapper} from "@/public/mapping/dnd5/DND5SpellDataToViewModelMapper";

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
    private httpService: HttpService;
    private spellSortingService: SpellSortingService;
    private spellDataToViewModelMapper: DND5SpellDataToViewModelMapper;

    constructor(props) {
        super(props);
        this.httpService = new HttpService();
        this.spellSortingService = new SpellSortingService();
        this.spellDataToViewModelMapper = new DND5SpellDataToViewModelMapper();
        this.state = {
            shouldDisplayInnateSpellCastingSection: false,
            innateSpellsToChooseFrom: [],
            slotSpellsToChooseFrom: [],
        }
    }

    componentDidMount = async(): Promise<void> => {
        try {
            const spellData = await this.httpService.get('/V1/DND5/Spell');
            const mappedInnateSpells = this.spellSortingService.sortSpellsBySpellLevel(this.spellDataToViewModelMapper.mapMultiple(spellData));
            this.setState({innateSpellsToChooseFrom: mappedInnateSpells})
            const mappedSlotSpells = this.spellSortingService.sortSpellsBySpellLevel(this.spellDataToViewModelMapper.mapMultiple(spellData));
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
            innateSpellsToChooseFrom: this.spellSortingService.sortSpellsBySpellLevel(
                this.state.innateSpellsToChooseFrom.concat([spell])
            )
        });
    }

    handleAddSlotSpellToChoice = (spell: DND5SpellViewModel): void => {
        this.setState({
            slotSpellsToChooseFrom: this.spellSortingService.sortSpellsBySpellLevel(
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