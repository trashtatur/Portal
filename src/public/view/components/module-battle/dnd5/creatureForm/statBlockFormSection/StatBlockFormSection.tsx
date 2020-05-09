import * as React from 'react';
import {ReactNode} from 'react';
import * as style from './dnd5CreatureFormStatBlock.css';

interface StatBlockFormSectionProps {
    strength: string;
    changeStrength: Function;
    dexterity: string;
    changeDexterity: Function;
    constitution: string;
    changeConstitution: Function;
    intelligence: string;
    changeIntelligence: Function;
    wisdom: string;
    changeWisdom: Function;
    charisma: string;
    changeCharisma: Function;
}

export class StatBlockFormSection extends React.Component<StatBlockFormSectionProps> {

    render(): ReactNode {
        return (
            <>
                <div className={style.statInputContainer}>
                    <div className={style.statInputRow}>
                        <div className={style.statInputSection}>
                        <label htmlFor={'dnd5CreatureFormInput__strength'}>Str</label>
                        <input
                            className={style.statInputField}
                            id={'dnd5CreatureFormInput__strength'}
                            value={this.props.strength}
                            type={'number'}
                            onChange={e => this.props.changeStrength(e)}
                        />
                        </div>
                        <div className={style.statInputSection}>
                        <label htmlFor={'dnd5CreatureFormInput__dexterity'}>Dex</label>
                        <input
                            className={style.statInputField}
                            id={'dnd5CreatureFormInput__dexterity'}
                            value={this.props.dexterity}
                            type={'number'}
                            onChange={e => this.props.changeDexterity(e)}
                        />
                        </div>
                        <div className={style.statInputSection}>
                        <label htmlFor={'dnd5CreatureFormInput__constitution'}>Con</label>
                        <input
                            className={style.statInputField}
                            id={'dnd5CreatureFormInput__constitution'}
                            value={this.props.constitution}
                            type={'number'}
                            onChange={e => this.props.changeConstitution(e)}
                        />
                        </div>
                    </div>
                    <div className={style.statInputRow}>
                        <div className={style.statInputSection}>
                        <label htmlFor={'dnd5CreatureFormInput__intelligence'}>Int</label>
                        <input
                            className={style.statInputField}
                            id={'dnd5CreatureFormInput__intelligence'}
                            value={this.props.intelligence}
                            type={'number'}
                            onChange={e => this.props.changeIntelligence(e)}
                        />
                        </div>
                        <div className={style.statInputSection}>
                        <label htmlFor={'dnd5CreatureFormInput__wisdom'}>Wis</label>
                        <input
                            className={style.statInputField}
                            id={'dnd5CreatureFormInput__wisdom'}
                            value={this.props.wisdom}
                            type={'number'}
                            onChange={e => this.props.changeWisdom(e)}
                        />
                        </div>
                        <div className={style.statInputSection}>
                            <label htmlFor={'dnd5CreatureFormInput__charisma'}>Cha</label>
                            <input
                                className={style.statInputField}
                                id={'dnd5CreatureFormInput__charisma'}
                                value={this.props.charisma}
                                type={'number'}
                                onChange={e => this.props.changeCharisma(e)}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}