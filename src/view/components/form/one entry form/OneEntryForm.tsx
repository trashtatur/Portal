import * as React from "react";
import axios from 'axios'
import {uuidv4} from "../../helper/helperFunctions";
import {oneEntryFormEntry} from "../../componentTypes";
import {ReactElement} from "react";
import * as style from './oneEntryForm.css';


export interface OneEntryFormProps {
    formValue: "language" | "sense" | "skill" | "talent";
    type: "edit" | "create";
}

export interface OneEntryFormState {
    inputs: oneEntryFormEntry[];
}

export class OneEntryForm extends React.Component<OneEntryFormProps, OneEntryFormState> {

    constructor(props) {
        super(props);
        this.state = {
            inputs: [{value: "", id: uuidv4()}],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.addOneMore = this.addOneMore.bind(this);
    }

    ROUTE = `/V1/${this.props.formValue}`;

    async postData(data): Promise<void> {
        try {
            await axios.post(this.ROUTE, data);
            alert(`Created entries for ${this.props.formValue}(s) in database`);
            this.setState({inputs: [{value: "", id: uuidv4()}]});
        } catch (error) {
            console.log(error)
        }
    }

    handleSubmit(event): void {
        this.postData(this.state.inputs);
        event.preventDefault()
    }

    handleFieldChange(event): void {
        this.setState({
            inputs: this.state.inputs.map((elem) => {
                if (elem.id !== event.target.id) return elem;
                return {...elem, value: event.target.value};
            })
        });
    }

    addOneMore(event): void {
        const newInputs = this.state.inputs;
        newInputs.push({value: "", id: uuidv4()});
        this.setState({inputs: newInputs})
    }

    removeOne(id): void {
        this.setState({
            inputs: this.state.inputs.filter(elem => {
                return elem.id != id
            })
        })
    }


    render(): ReactElement {
        return (
            <div className={style.formContainer}>
                <button onClick={this.addOneMore} className={style.formAddButton}>+</button>
                <form onSubmit={this.handleSubmit}>
                    <h3>{this.props.formValue}s</h3>
                    {
                        this.state.inputs.map((elem, i) => {
                            return (
                                <div key={i} className={style.formField}>
                                    <label>
                                        {this.props.formValue}
                                        <input id={elem.id} type={"text"} value={elem.value}
                                               onChange={this.handleFieldChange}/>
                                        <button type={"button"} onClick={() => this.removeOne(elem.id)}
                                                className={style.formButton}>-
                                        </button>
                                    </label>
                                </div>
                            )
                        })
                    }
                    <button type={"submit"} className={style.formButton}>submit</button>
                </form>
            </div>
        )
    }
}