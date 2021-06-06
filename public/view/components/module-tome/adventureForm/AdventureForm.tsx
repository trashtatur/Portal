import * as React from 'react';
import {ReactNode} from 'react';
import {AdventureViewModel} from "../../../../model/AdventureViewModel";
import axios from 'axios';
import * as style from './adventureForm.css'

interface AdventureFormState {
    adventure: AdventureViewModel;
}

export class AdventureForm extends React.Component<{}, AdventureFormState> {

    constructor(props) {
        super(props);
        this.state = {
            adventure: new AdventureViewModel()
        }
    }


    handleNameChange = (event): void => {
        const adventureVM = this.state.adventure;
        adventureVM.name = event.target.value;
        this.setState({adventure: adventureVM})
    };

    handleCoreChange = (event): void => {
        const adventureVM = this.state.adventure;
        adventureVM.core = event.target.value;
        this.setState({adventure: adventureVM})
    };

    handleSubmit = async (event): Promise<void> => {
        try {
            event.preventDefault();
            await axios.post('/V1/Adventure', this.state.adventure);
            alert(`Created adventure ${this.state.adventure.name} in database`)
        } catch (e) {
            console.log(e)
        }
    };

    render(): ReactNode {
        return (
            <form className={style.adventureCreateForm} onSubmit={this.handleSubmit}>
                <div className={style.formSection}>
                <label htmlFor={"adventureForm-name"}>Name</label>
                <input
                    className={style.nameTextInput}
                    value={this.state.adventure.name}
                    type={"text"}
                    id={"adventureForm-name"}
                    onChange={this.handleNameChange}
                />
                </div>
                <div className={style.formSection}>
                <label htmlFor={"adventureForm-core"}>Core</label>
                <textarea
                    className={style.coreTextArea}
                    value={this.state.adventure.core}
                    id={"adventureForm-core"}
                    onChange={this.handleCoreChange}
                />
                </div>
                <button type={"submit"} className={style.adventureSubmit}>Submit</button>
            </form>
        )
    }
}