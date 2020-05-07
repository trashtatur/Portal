import * as React from 'react';
import {ReactElement, ReactNode} from 'react';
import {DND5CreatureForm} from "../creatureForm/DND5CreatureForm";
import {DND5SpellForm} from "../spellForm/DND5SpellForm";
import {DND5TalentForm} from "../talentForm/DND5TalentForm";
import {DND5ActionForm} from "../actionForm/DND5ActionForm";
import {DND5LanguageForm} from "../languageForm/DND5LanguageForm";
import * as style from './dnd5FormMenu.css';

interface FormMenuProps {
    type: 'edit' | 'create';
}

interface FormMenuState {
    renderedForm: ReactElement;
}

export class DND5FormMenu extends React.Component<FormMenuProps, FormMenuState> {

    constructor(props) {
        super(props);
        this.state = {
            renderedForm: null
        }
    }

    handleCreatureFormSelect = (): void => {this.setState({renderedForm: <DND5CreatureForm />})}

    handleSpellFormSelect = (): void => {this.setState({renderedForm: <DND5SpellForm />})}

    handleTalentFormSelect = (): void => {this.setState({renderedForm: <DND5TalentForm />})}

    handleActionFormSelect = (): void => {this.setState({renderedForm: <DND5ActionForm />})}

    handleLanguageSelectForm = (): void => {this.setState({renderedForm: <DND5LanguageForm />})}

    render(): ReactNode {
        return (
            <div className={style.formMenuContainer}>
                <div className={style.formButtons}>
                    <button
                        className={style.formMenuButton}
                        onClick={() => this.handleCreatureFormSelect()}
                    >Creature</button>
                    <button
                        className={style.formMenuButton}
                        onClick={() => this.handleSpellFormSelect()}
                    >Spell</button>
                    <button
                        className={style.formMenuButton}
                        onClick={() => this.handleTalentFormSelect()}
                    >Feat</button>
                    <button
                        className={style.formMenuButton}
                        onClick={() => this.handleLanguageSelectForm()}
                    >Language</button>
                    <button
                        className={style.formMenuButton}
                        onClick={() => this.handleActionFormSelect()}
                    >Action</button>
                </div>
                <div className={style.formContainer}>
                    {this.state.renderedForm}
                </div>
            </div>
        )
    }
}