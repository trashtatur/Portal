import * as React from "react";
import {PathfinderCreatureForm} from "../formCreature/PathfinderCreatureForm";
import {OneEntryForm} from "../../../uiBasic/formOneEntry/OneEntryForm";
import {PathfinderActionForm} from "../formAction/PathfinderActionForm";
import {CreatureEditWrapper} from "../formCreature/edit wrapper/CreatureEditWrapper";
import {ReactElement} from "react";
import * as style from './formMenu.css'


export interface FormProps {
    type: "edit" | "create";
}

export interface FormState {
    formType: "creature" | "language" | "sense" | "skill" | "action" | "talent";
}


export class FormMenu extends React.Component<FormProps, FormState> {

    constructor(props) {
        super(props);
        this.setFormType = this.setFormType.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.state = {
            formType: null
        }
    }

    setFormType(type): void {
        this.setState({formType: type})
    }

    renderForm(): ReactElement {
        if (this.state.formType != null) {
            switch (this.state.formType) {
                case "creature":
                    if (this.props.type == "edit") return <CreatureEditWrapper/>;
                    return <PathfinderCreatureForm type={this.props.type}/>;
                case "action":
                    return <PathfinderActionForm type={this.props.type}/>;
                case "talent":
                    return <OneEntryForm formValue={this.state.formType} type={this.props.type}/>;
                case "skill":
                    return <OneEntryForm formValue={this.state.formType} type={this.props.type}/>;
                case "language":
                    return <OneEntryForm formValue={this.state.formType} type={this.props.type}/>;
                default:
                    return <div/>
            }
        }
        return <div/>;
    }

    render(): ReactElement {
        return (
                    <div className={style.formContainer}>
                        <div className={style.formTopBar}>
                            {this.props.type}:<br/>
                            <button className={style.formTypeButton}
                                    onClick={() => this.setFormType("creature")}>Creature
                            </button>
                            <button className={style.formTypeButton}
                                    onClick={() => this.setFormType("language")}>Language
                            </button>
                            <button className={style.formTypeButton} onClick={() => this.setFormType("skill")}>Skill
                            </button>
                            <button className={style.formTypeButton} onClick={() => this.setFormType("talent")}>Talent
                            </button>
                            <button className={style.formTypeButton} onClick={() => this.setFormType("action")}>Action
                            </button>
                        </div>
                        {this.renderForm()}
                    </div>
        );
    }
}