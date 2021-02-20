import * as React from 'react';
import {ReactNode} from 'react';
import {DND5LanguageViewModel} from "@/public/model/dnd5/DND5LanguageViewModel";
import {DND5TalentViewModel} from "@/public/model/dnd5/DND5TalentViewModel";
import {DND5SenseViewModel} from "@/public/model/dnd5/DND5SenseViewModel";
import {DND5SkillViewModel} from "@/public/model/dnd5/DND5SkillViewModel";
import {MultiSelectWithCreate} from "@/public/view/components/uiBasic/multiSelectWithCreate/MultiSelectWithCreate";
import {MultiSelectNoCreate} from "@/public/view/components/uiBasic/multiSelectNoCreate/MultiSelectNoCreate";
import CreatableSelect from 'react-select';
import {selectable} from "@/public/types/frontendTypes";
import {SelectEventTypesEnum} from "@/public/model/enumeration/SelectEventTypesEnum";
import * as style from "../formSectionGeneralStyles.css";
import {uuidv4} from "@/public/service/UuidService";

interface LanguagesFeatsSensesAndSkillsFormSectionProps {
    languages: DND5LanguageViewModel[];
    selectableLanguages: DND5LanguageViewModel[];
    changeLanguages: Function;
    feats: DND5TalentViewModel[];
    selectableFeats: DND5TalentViewModel[];
    changeFeats: Function;
    senses: DND5SenseViewModel[];
    changeSenses: Function;
    skills: DND5SkillViewModel[];
    selectableSkills: DND5SkillViewModel[];
    changeSkills: Function;
}

interface LanguagesFeatsSensesAndSkillsFormSectionState {
    senseFields: {sense: DND5SenseViewModel; id: string}[];
}

const selectableSenses: selectable[] = [
    {
        label: 'Truesight',
        value: 'Truesight',
    },
    {
        label: 'Darkvision',
        value: 'Darkvision',
    },
    {
        label: 'Blindsight',
        value: 'Blindsight'
    }
]

export class LanguagesFeatsSensesAndSkillsFormSection extends React.Component<LanguagesFeatsSensesAndSkillsFormSectionProps, LanguagesFeatsSensesAndSkillsFormSectionState> {

    constructor(props) {
        super(props);
        this.state = {
            senseFields: this.formatPropsForState(),
        }
    }

    formatPropsForState = (): {sense: DND5SenseViewModel; id: string}[] => {
        return this.props.senses.map(sense => {
            return {sense: sense, id: uuidv4()}
        });
    };

    formatStateForProps = (): DND5SenseViewModel[] => {
        return this.state.senseFields.map(senseField => {
            return senseField.sense
        });
    };


    addOneSenseField = (): void => {
        this.setState({
            senseFields: this.state.senseFields.concat(
                [{sense: new DND5SenseViewModel('', 0), id: uuidv4()}]
            )
        });
    }

    removeOneSenseField = (id: string): void => {
        this.setState({
            senseFields: this.state.senseFields.filter(element => {
                return element.id !== id
            })
        })
    }


    handleSenseChange = (id, value, option): void => {
        const fields = this.state.senseFields;
        if (
            option.action === SelectEventTypesEnum.SELECT_OPTION
            || option.action === SelectEventTypesEnum.CREATE_OPTION
        ) {
            const senseField = fields.find(elem => {
                if (elem.id === id) {
                    return elem;
                }
            })
            senseField.sense.name = value.value;

        }
        if (option.action === SelectEventTypesEnum.REMOVE_OPTION) {
            const senseField = fields.find(elem => {
                if (elem.id === id) {
                    return elem;
                }
            })
            senseField.sense.name = '';
        }
        this.setState({senseFields: fields}, () => {
            this.props.changeSenses(this.formatStateForProps())
        })
    }

    handleSenseValueChange = (id, event): void => {
        this.setState({
            senseFields: this.state.senseFields.map(elem => {
                if (elem.id === id) {
                    const valueAsNumber = parseInt(event.target.value);
                    elem.sense.value = isNaN(valueAsNumber) ? null : valueAsNumber;
                }
                return elem;
            })
        }, () => {
            this.props.changeSenses(this.formatStateForProps())
        });
    }

    render(): ReactNode {
        return (
            <>
                <div className={style.formInputSection}>
                    <label htmlFor={'dnd5CreatureForm--languages'}>Languages</label>
                    <MultiSelectWithCreate
                        handleSelectChange={this.props.changeLanguages}
                        selectables={this.props.selectableLanguages.map(language => {
                            return {label: language.name, value: language.name}
                        })}
                        value={this.props.languages.map(language => {
                            return {label: language.name, value: language.name}
                        })}
                        className={style.selectMenu}
                        id={'dnd5CreatureForm--languages'}
                    />
                </div>
                <div className={style.formInputSection}>
                    <label htmlFor={'dnd5CreatureForm--skillProficiencies'}>Skills</label>
                    <MultiSelectNoCreate
                        handleSelectChange={this.props.changeSkills}
                        selectables={this.props.selectableSkills.map(skill => {
                            return {label: skill.name, value: skill.name}
                        })}
                        value={this.props.skills.map(skill => {
                            return {label: skill.name, value: skill.name}
                        })}
                        className={style.selectMenu}
                        id={'dnd5CreatureForm--skillProficiencies'}
                    />
                </div>
                <div className={style.formInputSection}>
                    <label>Feats</label>
                    <MultiSelectNoCreate
                        handleSelectChange={this.props.changeFeats}
                        selectables={this.props.feats.map(feat => {
                            return {label: feat.name, value: feat.name}
                        })}
                        className={style.selectMenu}
                    />
                </div>
                <div className={style.formSubSectionHeader}>
                    Add a sense...
                    <button
                        className={style.formSubSectionAddButton}
                        onClick={() => this.addOneSenseField()}
                    >+</button>
                </div>
                <div
                    id={'dnd5CreatureForm--senses'}
                >
                    {
                        this.state.senseFields.map(elem => {
                            return (
                                <div
                                    className={style.formInputSection}
                                    key={elem.id}
                                >
                                    <label htmlFor={`${elem.id}--dnd5CreatureForm--senses--name`}>Sense</label>
                                    <CreatableSelect
                                        id={`${elem.id}--dnd5CreatureForm--senses--name`}
                                        onChange={(value, option) => this.handleSenseChange(elem.id, value, option)}
                                        options={selectableSenses}
                                        value={{label: elem.sense.name, value: elem.sense.name}}
                                        className={style.formSubSelectMenu}
                                    />
                                    <label htmlFor={`${elem.id}--dnd5CreatureForm--senses--level`}>Level</label>
                                    <input
                                        id={`${elem.id}--dnd5CreatureForm--senses--level`}
                                        value={elem.sense.value}
                                        type={'number'}
                                        style={{width: '45px'}}
                                        onChange={e => this.handleSenseValueChange(elem.id, e)}
                                        min={0}
                                        max={999}
                                    />
                                    <button
                                        className={style.formSubSectionRemoveButton}
                                        onClick={() => this.removeOneSenseField(elem.id)}
                                    >
                                        -
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}