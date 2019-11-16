import * as React from "react";
import {CreatureForm} from "./creature/CreatureForm";
const Popup = require('reactjs-popup');
import * as style from './form.module.css'


export interface IFormProps {
    modalTrigger;
    type: "edit"|"create"
}

export interface IFormState {
    formType: "creature"|"language"|"sense"|"skill"|"action"|"talent"|""
}


export class Form extends React.Component<IFormProps,IFormState> {

    constructor(props) {
        super(props);
        this.state = {
            formType: ""
        };
        this.setFormType = this.setFormType.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }


    setFormType(type) {
        this.setState({formType:type})
    }

    renderForm() {
        switch (this.state.formType) {
            case "creature":
                return <CreatureForm type={this.props.type}/>;
            default:
                return ""

        }
    }

    render() {
        return (
            <Popup modal trigger={this.props.modalTrigger} position={"top center"} >
                <div>
                    {this.props.type}:<br/>
                    <button className={style.formTypeButton} onClick={()=>this.setFormType("creature")}>Creature</button>
                    <button className={style.formTypeButton} onClick={()=>this.setFormType("language")}>Language</button>
                    <button className={style.formTypeButton} onClick={()=>this.setFormType("sense")}>Sense</button>
                    <button className={style.formTypeButton} onClick={()=>this.setFormType("skill")}>Skill</button>
                    <button className={style.formTypeButton} onClick={()=>this.setFormType("talent")}>Talent</button>
                    <button className={style.formTypeButton} onClick={()=>this.setFormType("action")}>Action</button>
                    {this.renderForm()}
                </div>
            </Popup>
        );
    }
}