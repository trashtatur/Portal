import * as React from "react";
import axios from "axios";
import * as style from './actionForm.css';

export interface IActionFormProps {
    type:"edit"|"create"
}

export interface IActionFormState {
    name:string,
    rangeType:string,
    attackBonus,
    range,
    damage:string,
    critMod:string,
    damageType:string,
    additionalInfo:string
}

export class ActionForm extends React.Component<IActionFormProps,IActionFormState> {

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

    async postData(data) {
        let that=this;
        axios.post(this.ROUTE,data).then(
            function (result) {
                alert('Created action in database');
                that.setState({name:""});
                that.setState({rangeType:""});
                that.setState({attackBonus:""});
                that.setState({damage:""});
                that.setState({damageType:""});
                that.setState({range:""});
                that.setState({critMod:""});
                that.setState({additionalInfo:""});
            }
        ).catch(function (error) {
            console.log(error)
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postData(this.state)
    }

    handleNameChange(event) {
        this.setState({name:event.target.value})
    }

    handleRangeTypeChange(event) {
        this.setState({rangeType:event.target.value})
    }

    handleAttackBonusChange(event) {
        this.setState({attackBonus:event.target.value})
    }

    handleRangeChange(event) {
        this.setState({range: event.target.value})
    }

    handleDamageChange(event) {
        this.setState({damage: event.target.value})
    }

    handleCritModChange(event) {
        this.setState({critMod: event.target.value})
    }

    handleDamageTypeChange(event) {
        this.setState({damageType: event.target.value})
    }

    handleAdditionalInfoChange(event) {
        this.setState({additionalInfo: event.target.value})
    }

    render(): any {
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
                        <input type={"text"} value={this.state.additionalInfo} onChange={this.handleAdditionalInfoChange}/>
                    </label>
                    <button type={"submit"} className={style.formButton}>submit</button>
                </form>
            </div>
        )
    }

}