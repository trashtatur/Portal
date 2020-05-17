import * as React from 'react';
import {ReactNode} from 'react';
import {ClassAndLevelViewModel} from "@/public/model/dataModel/ClassAndLevelViewModel";
import {uuidv4} from "@/public/service/helperFunctions";
import * as style from '../formSectionGeneralStyles.css';

interface ClassesAndLevelsFormSectionProps {
    classesAndLevels: ClassAndLevelViewModel[];
    changeClassesAndLevels: Function;
}

interface ClassesAndLevelsFormSectionState {
    classesAndLevelsToAdd: { classAndLevel: ClassAndLevelViewModel; id: string }[];
}

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
                [{classAndLevel: new ClassAndLevelViewModel('', 1), id: uuidv4()}]
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

    handleClassChange = (id, event): void => {
        this.setState({
            classesAndLevelsToAdd: this.state.classesAndLevelsToAdd.map(elem => {
                if (elem.id === id) {
                    elem.classAndLevel.name = event.target.value;
                }
                return elem;
            })
        }, () => {
            this.props.changeClassesAndLevels(this.formatStateForProps())
        });
    }

    handleClassLevelChange = (id, event) => {
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
                <div style={{display: 'flex', justifyContent:'space-evenly', alignItems: 'center', minHeight: '40px'}}>
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
                                <input
                                    id={`${elem.id}--class`}
                                    value={elem.classAndLevel.name}
                                    type={'text'}
                                    onChange={e => this.handleClassChange(elem.id, e)}
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