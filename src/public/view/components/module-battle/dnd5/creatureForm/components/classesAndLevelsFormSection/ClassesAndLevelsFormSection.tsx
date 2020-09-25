import * as React from 'react';
import {ReactNode} from 'react';
import {ClassAndLevelViewModel} from "@/public/model/ClassAndLevelViewModel";
import {uuidv4} from "@/public/service/helperFunctions";
import {ClassesEnum} from "@/public/model/enumeration/dnd5/ClassesEnum";
import {selectable} from "@/public/types/frontendTypes";
import Select from 'react-select';
import {SelectEventTypesEnum} from "@/public/model/enumeration/SelectEventTypesEnum";
import * as style from '../formSectionGeneralStyles.css';

interface ClassesAndLevelsFormSectionProps {
    classesAndLevels: ClassAndLevelViewModel[];
    changeHitDiceType: Function;
    changeHitDiceCount: Function;
    changeClassesAndLevels: Function;
}

interface ClassesAndLevelsFormSectionState {
    classesAndLevelsToAdd: { classAndLevel: ClassAndLevelViewModel; id: string }[];
}

const selectables: selectable[] = [
    { label: ClassesEnum.BARBARIAN, value: ClassesEnum.BARBARIAN },
    { label: ClassesEnum.BARD, value: ClassesEnum.BARD },
    { label: ClassesEnum.CLERIC, value: ClassesEnum.CLERIC },
    { label: ClassesEnum.ARTIFICER, value: ClassesEnum.ARTIFICER },
    { label: ClassesEnum.DRUID, value: ClassesEnum.DRUID },
    { label: ClassesEnum.FIGHTER, value: ClassesEnum.FIGHTER },
    { label: ClassesEnum.MONK, value: ClassesEnum.MONK },
    { label: ClassesEnum.PALADIN, value: ClassesEnum.PALADIN },
    { label: ClassesEnum.RANGER, value: ClassesEnum.RANGER },
    { label: ClassesEnum.ROGUE, value: ClassesEnum.ROGUE },
    { label: ClassesEnum.SORCERER, value: ClassesEnum.SORCERER },
    { label: ClassesEnum.WARLOCK, value: ClassesEnum.WARLOCK },
    { label: ClassesEnum.WIZARD, value: ClassesEnum.WIZARD }
]

export class ClassesAndLevelsFormSection extends React.Component<ClassesAndLevelsFormSectionProps, ClassesAndLevelsFormSectionState> {

    constructor(props) {
        super(props);
        this.state = {
            classesAndLevelsToAdd: this.formatPropsForState(),
        }
    }

    formatPropsForState = (): { classAndLevel: ClassAndLevelViewModel; id: string }[] => {
        return this.props.classesAndLevels.map(classAndLevel => {
            return {classAndLevel: classAndLevel, id: uuidv4()}
        })
    }

    formatStateForProps = (): ClassAndLevelViewModel[] => {
        return this.state.classesAndLevelsToAdd.map(elem => {
            return elem.classAndLevel;
        })
    }


    addOne = (): void => {
        this.setState({
            classesAndLevelsToAdd: this.state.classesAndLevelsToAdd.concat(
                [{classAndLevel: new ClassAndLevelViewModel(ClassesEnum.NONE, 1, ''), id: uuidv4()}]
            )
        });
    }

    removeOne = (id: string): void => {
        this.setState({
            classesAndLevelsToAdd: this.state.classesAndLevelsToAdd.filter(element => {
                return element.id !== id
            })
        })
    }

    handleClassChange = (id, value, option): void => {
        let className = ClassesEnum.NONE;
        if (option.action === SelectEventTypesEnum.SELECT_OPTION) {
            className = value.value;
        } else if (option.action === SelectEventTypesEnum.REMOVE_OPTION) {
            className = ClassesEnum.NONE;
        }
        this.setState({
            classesAndLevelsToAdd: this.state.classesAndLevelsToAdd.map(elem => {
                if (elem.id === id) {
                    elem.classAndLevel.name = className;
                }
                return elem;
            })
        }, () => {
            this.props.changeClassesAndLevels(this.formatStateForProps())
        });
    }

    handleClassLevelChange = (id, event): void => {
        this.setState({
            classesAndLevelsToAdd: this.state.classesAndLevelsToAdd.map(elem => {
                if (elem.id === id) {
                    const valueAsNumber = parseInt(event.target.value);
                    elem.classAndLevel.level = isNaN(valueAsNumber) ? null : valueAsNumber;
                }
                return elem;
            })
        }, () => {
            this.props.changeClassesAndLevels(this.formatStateForProps())
        });
    }

    render(): ReactNode {
        return (
            <>
                <div className={style.formSubSectionHeader}>
                    Add a class...
                    <button
                        className={style.formSubSectionAddButton}
                        onClick={() => this.addOne()}
                    >+</button>
                </div>
                {
                    this.state.classesAndLevelsToAdd.map(elem => {
                        return (
                            <div className={style.formInputSection} key={elem.id}>
                                <label htmlFor={`${elem.id}--class`}>Class</label>
                                <Select
                                    options={selectables}
                                    id={`${elem.id}--class`}
                                    className={style.formSubSelectMenu}
                                    value={{label: elem.classAndLevel.name, value: elem.classAndLevel.name}}
                                    onChange={(value, option) => this.handleClassChange(elem.id, value, option)}
                                />
                                <label htmlFor={`${elem.id}--level`}>Level</label>
                                <input
                                    id={`${elem.id}--level`}
                                    value={elem.classAndLevel.level}
                                    onChange={e => this.handleClassLevelChange(elem.id, e)}
                                    type={'number'}
                                    min={0}
                                    max={20}
                                />
                                <button
                                    className={style.formSubSectionRemoveButton}
                                    onClick={() => this.removeOne(elem.id)}
                                >
                                    -
                                </button>
                            </div>
                        )
                    })
                }
            </>
        )
    }
}