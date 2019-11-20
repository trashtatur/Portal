import * as React from "react";
import axios from 'axios'
import {uuidv4} from "../../helper/helperFunctions";
import * as style from './oneEntryForm.module.css';

export interface IOneEntryFormProps {
    formValue: "language" | "sense" | "skill" | "talent"
    type: "edit" | "create"
}

export interface IOneEntryFormState {
    inputs: any[]
}

export class OneEntryForm extends React.Component<IOneEntryFormProps, IOneEntryFormState> {

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

    async postData(data) {
        axios.post(this.ROUTE, data).then(
            function (result) {
                console.log(result)
            }
        ).catch(function (error) {
            console.log(error)
        })
    }

    handleSubmit(event) {
        console.log(this.state.inputs);
        this.postData(this.state.inputs);
        event.preventDefault()
    }

    handleFieldChange(event) {
        this.setState({
            inputs: this.state.inputs.map((elem) => {
                if (elem.id !== event.target.id) return elem;
                return {...elem, value: event.target.value};
            })
        });
    }

    addOneMore(event) {
        let new_inputs = this.state.inputs;
        new_inputs.push({value: "", id: uuidv4()});
        this.setState({inputs: new_inputs})
    }

    removeOne(id) {
        this.setState({
            inputs: this.state.inputs.filter(elem => {
                return elem.id != id
            })
        })
    }


    render(): any {
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
                                        <button type={"button"} onClick={()=>this.removeOne(elem.id)}
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