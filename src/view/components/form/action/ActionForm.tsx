import * as React from "react";
import axios from "axios";
import {ReactElement} from "react";
import * as style from './actionForm.css';

export interface ActionFormProps {
    type: "edit" | "create";
}

export interface ActionFormState {
    name: string;
    rangeType: string;
    attackBonus;
    range;
    damage: string;
    critMod: string;
    damageType: string;
    additionalInfo: string;
}

export class ActionForm extends React.Component<ActionFormProps, ActionFormState> {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            rangeType: "",
            attackBonus: "",
            range: "",
            damage: "",
            critMod: "",
            damageType: "",
            additionalInfo: ""
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRangeChange = this.handleRangeChange.bind(this);
        this.handleRangeTypeChange = this.handleRangeTypeChange.bind(this);
        this.handleAttackBonusChange = this.handleAttackBonusChange.bind(this);
        this.handleCritModChange = this.handleCritModChange.bind(this);
        this.handleDamageChange = this.handleDamageChange.bind(this);
        this.handleDamageTypeChange = this.handleDamageTypeChange.bind(this);
        this.handleAdditionalInfoChange = this.handleAdditionalInfoChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postData = this.postData.bind(this);
    }

    ROUTE = '/V1/Action';

    async postData(data): Promise<void> {
        try {
            await axios.post(this.ROUTE, data);
            alert('Created action in database');
            this.setState({name: ""});
            this.setState({rangeType: ""});
            this.setState({attackBonus: ""});
            this.setState({damage: ""});
            this.setState({damageType: ""});
            this.setState({range: ""});
            this.setState({critMod: ""});
            this.setState({additionalInfo: ""});
        } catch (error) {
            console.log(error)
        }
    }

    handleSubmit(event): void {
        event.preventDefault();
        this.postData(this.state)
    }

    handleNameChange(event): void {
        this.setState({name: event.target.value})
    }

    handleRangeTypeChange(event): void {
        this.setState({rangeType: event.target.value})
    }

    handleAttackBonusChange(event): void {
        this.setState({attackBonus: event.target.value})
    }

    handleRangeChange(event): void {
        this.setState({range: event.target.value})
    }

    handleDamageChange(event): void {
        this.setState({damage: event.target.value})
    }

    handleCritModChange(event): void {
        this.setState({critMod: event.target.value})
    }

    handleDamageTypeChange(event): void {
        this.setState({damageType: event.target.value})
    }

    handleAdditionalInfoChange(event): void {
        this.setState({additionalInfo: event.target.value})
    }

    render(): ReactElement {
        return (
            <div className={style.formContainer}>
                <form onSubmit={this.handleSubmit}>
                    <label className={style.formField}>
                        name:
                        <input type={"text"} value={this.state.name} onChange={this.handleNameChange}/>
                    </label>
                    <label className={style.formField}>
                        range type:
                        <input type={"text"} value={this.state.rangeType} onChange={this.handleRangeTypeChange}/>
                    </label>
                    <label className={style.formField}>
                        attack bonus:
                        <input type={"number"} value={this.state.attackBonus} onChange={this.handleAttackBonusChange}/>
                    </label>
                    <label className={style.formField}>
                        range:
                        <input type={"number"} value={this.state.range} onChange={this.handleRangeChange}/>
                    </label>
                    <label className={style.formField}>
                        damage:
                        <input type={"text"} value={this.state.damage} onChange={this.handleDamageChange}/>
                    </label>
                    <label className={style.formField}>
                        crit mod:
                        <input type={"text"} value={this.state.critMod} onChange={this.handleCritModChange}/>
                    </label>
                    <label className={style.formField}>
                        damage type:
                        <input type={"text"} value={this.state.damageType} onChange={this.handleDamageTypeChange}/>
                    </label>
                    <label className={style.formField}>
                        additional info:
                        <input type={"text"} value={this.state.additionalInfo}
                               onChange={this.handleAdditionalInfoChange}/>
                    </label>
                    <button type={"submit"} className={style.formButton}>submit</button>
                </form>
            </div>
        )
    }

}