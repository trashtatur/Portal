import * as React from "react";
import {CreatureForm} from "./creature/CreatureForm";
const Popup = require('reactjs-popup');
import {OneEntryForm} from "./one entry form/OneEntryForm";
import {ActionForm} from "./action/ActionForm";
import * as style from './form.module.css'



export interface IFormProps {
    modalTrigger;
    type: "edit"|"create"
}

export interface IFormState {
    formType: "creature"|"language"|"sense"|"skill"|"action"|"talent"
}


export class Form extends React.Component<IFormProps,IFormState> {

    constructor(props) {
        super(props);
        this.setFormType = this.setFormType.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.state = {
            formType: null
        }
    }


    setFormType(type) {
        this.setState({formType:type})
    }

    renderForm() {
        if (this.state.formType != null) {
            switch (this.state.formType) {
                case "creature":
                    return <CreatureForm type={this.props.type}/>;
                case "action":
                    return <ActionForm type={this.props.type}/>;
                case "talent":
                    return <OneEntryForm formValue={this.state.formType} type={this.props.type}/>;
                case "skill":
                    return <OneEntryForm formValue={this.state.formType} type={this.props.type}/>;
                case "language":
                    return <OneEntryForm formValue={this.state.formType} type={this.props.type}/>;
                default:
                    return ""
            }
        }
        return "";

    }

    render() {
        return (
            <Popup modal trigger={this.props.modalTrigger}
                   position={"top center"}
                   closeOnDocumentClick={false}
            >
                {close => (
                <div className={style.formContainer}>
                    <button className={style.modalCloseButton} onClick={()=>close()}>X</button>
                    {this.props.type}:<br/>
                    <button className={style.formTypeButton} onClick={()=>this.setFormType("creature")}>Creature</button>
                    <button className={style.formTypeButton} onClick={()=>this.setFormType("language")}>Language</button>
                    <button className={style.formTypeButton} onClick={()=>this.setFormType("skill")}>Skill</button>
                    <button className={style.formTypeButton} onClick={()=>this.setFormType("talent")}>Talent</button>
                    <button className={style.formTypeButton} onClick={()=>this.setFormType("action")}>Action</button>
                    {this.renderForm()}
                </div>
                )}
            </Popup>
        );
    }
}