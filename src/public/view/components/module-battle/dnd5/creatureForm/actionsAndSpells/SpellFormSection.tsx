import * as React from 'react';
import {ReactNode} from 'react';
import axios from 'axios';
import {MagicSchoolEnum} from "@/public/model/enumeration/dnd5/MagicSchoolEnum";
import {DND5SpellViewModel} from "@/public/model/dnd5/DND5SpellViewModel";
import {SpellLevelFilterChip} from "@/public/view/components/module-battle/dnd5/creatureForm/actionsAndSpells/spellLevelFilterChip/SpellLevelFilterChip";
import {SpellSchoolFilterChip} from "@/public/view/components/module-battle/dnd5/creatureForm/actionsAndSpells/spellSchoolFilterChip/SpellSchoolFilterChip";
import {DND5SpellDataToViewModelMapper} from "@/public/mapping/dnd5/DND5SpellDataToViewModelMapper";
import {SpellChip} from "@/public/view/components/module-battle/dnd5/spellChip/SpellChip";
import * as style from './spellFormSection.css';

interface SpellFormSectionProps {
    addSpell: Function;
    removeSpell: Function;
    chosenSpells: DND5SpellViewModel[];
}

interface SpellFormSectionState {
    spellsToChooseFrom: DND5SpellViewModel[];
    spellSearchFilter: string;
    spellLevelFilter: { level: number; active: boolean }[];
    spellSchoolFilter: { school: MagicSchoolEnum; active: boolean }[];
}

export class SpellFormSection extends React.Component<SpellFormSectionProps, SpellFormSectionState> {
    private spellDataToViewModelMapper: DND5SpellDataToViewModelMapper;

    constructor(props) {
        super(props);
        this.spellDataToViewModelMapper = new DND5SpellDataToViewModelMapper();
        this.state = {
            spellsToChooseFrom: [],
            spellSearchFilter: '',
            spellSchoolFilter: [
                {school: MagicSchoolEnum.ABJURATION, active: true},
                {school: MagicSchoolEnum.CONJURATION, active: true},
                {school: MagicSchoolEnum.DIVINATION, active: true},
                {school: MagicSchoolEnum.ENCHANTMENT, active: true},
                {school: MagicSchoolEnum.EVOCATION, active: true},
                {school: MagicSchoolEnum.ILLUSION, active: true},
                {school: MagicSchoolEnum.NECROMANCY, active: true},
                {school: MagicSchoolEnum.TRANSMUTATION, active: true},
            ],
            spellLevelFilter: [
                {level: 0, active: true},
                {level: 1, active: true},
                {level: 2, active: true},
                {level: 3, active: true},
                {level: 4, active: true},
                {level: 5, active: true},
                {level: 6, active: true},
                {level: 7, active: true},
                {level: 8, active: true},
                {level: 9, active: true},
            ]
        }
    }

    componentDidMount = async(): Promise<void> => {
        try {
            const spellData = (await axios.get('/V1/DND5/Spell')).data;
            const mappedSpells = this.sortSpellsBySpellLevel(this.spellDataToViewModelMapper.mapMultiple(spellData));
            this.setState({spellsToChooseFrom: mappedSpells})
        } catch (e) {
            console.log(e)
        }
    }
    filterSpellName = (event): void => {
        this.setState({spellSearchFilter: event.target.value})
    }

    filterSpellLevel = (spellLevel: number): void => {
        const spellLevelFilter = this.state.spellLevelFilter;
        spellLevelFilter.map(filter => {
            if (spellLevel === filter.level) {
                filter.active = !filter.active;
            }
        })
        this.setState({spellLevelFilter: spellLevelFilter});
    }

    filterSpellSchool = (spellSchool: MagicSchoolEnum): void => {
        const spellSchoolFilter = this.state.spellSchoolFilter;
        spellSchoolFilter.map(filter => {
            if (spellSchool === filter.school) {
                filter.active = !filter.active;
            }
        })
        this.setState({spellSchoolFilter: spellSchoolFilter});
    }

    selectSpell = (spell: DND5SpellViewModel): void => {
        const spellsToChooseFrom = this.state.spellsToChooseFrom.filter(spellChoice => {
            return spellChoice.id !== spell.id;
        })
        this.setState({spellsToChooseFrom: spellsToChooseFrom});
        this.props.addSpell(spell);
    }

    deselectSpell = (spell: DND5SpellViewModel): void => {
        const spellsToChooseFromUpdated = this.sortSpellsBySpellLevel(this.state.spellsToChooseFrom.concat([spell]));
        this.setState({spellsToChooseFrom: spellsToChooseFromUpdated})
        this.props.removeSpell(spell.id)
    }

    displaySpellInformation = (spell: DND5SpellViewModel): void => {

    }

    sortSpellsBySpellLevel = (spells: DND5SpellViewModel[]): DND5SpellViewModel[] => {
        return spells.sort((spellOne, spellTwo) => {
            if (spellOne.level > spellTwo.level) return 1;
            if (spellOne.level < spellTwo.level) return -1;
            return 0;
        })
    }

    render(): ReactNode {
        const sortedChosenSpells = this.sortSpellsBySpellLevel(this.props.chosenSpells);
        return <>
            <div className={style.spellLevelFilterSection}>
                {this.state.spellLevelFilter.map(spellLevelFilter => {
                    return <SpellLevelFilterChip
                        key={spellLevelFilter.level}
                        level={spellLevelFilter.level}
                        isActive={spellLevelFilter.active}
                        onClick={this.filterSpellLevel}
                    />
                })}
            </div>
            <div className={style.spellSchoolFilterSection}>
                {this.state.spellSchoolFilter.map(spellSchoolFilter => {
                    return <SpellSchoolFilterChip
                        key={spellSchoolFilter.school}
                        name={spellSchoolFilter.school}
                        isActive={spellSchoolFilter.active}
                        onClick={this.filterSpellSchool}
                    />
                })}
            </div>
            <div className={style.chosenSpellSection}>
                {sortedChosenSpells.map(spell => {
                    return <SpellChip
                        key={spell.id}
                        id={spell.id}
                        name={spell.name}
                        level={spell.level}
                        school={spell.school}
                        onClick={() => this.deselectSpell(spell)}
                        onHover={() => this.displaySpellInformation(spell)}
                    />
                })}
            </div>
            <div className={style.spellsToChooseHeader}>
                <span>Choose Spells...</span>
                <input
                    placeholder={'Search by name'}
                    value={this.state.spellSearchFilter}
                    onChange={this.filterSpellName}
                />
            </div>
            <div className={style.spellsToChooseSection}>
                {this.state.spellsToChooseFrom.map(spell => {
                    const nameFiltered =
                        !spell.name.toLowerCase().includes(this.state.spellSearchFilter.toLowerCase().trim());
                    if (nameFiltered) {
                        return '';
                    }
                    const schoolFiltered =
                        this.state.spellSchoolFilter.find(elem => {
                            return elem.school === spell.school &&  !elem.active
                        });
                    if (schoolFiltered) {
                        return '';
                    }
                    const spellLevelFiltered = this.state.spellLevelFilter.find(elem => {
                        return elem.level === spell.level && !elem.active
                    });
                    if (spellLevelFiltered) {
                        return '';
                    }
                    return  <SpellChip
                        key={spell.id}
                        id={spell.id}
                        name={spell.name}
                        level={spell.level}
                        school={spell.school}
                        onClick={() => this.selectSpell(spell)}
                        onHover={() => this.displaySpellInformation(spell)}
                    />
                })}
            </div>
        </>
    }
}