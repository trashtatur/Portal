import * as React from "react";
import axios from "axios";
import {ReactElement} from "react";
import {ActionViewModel} from "../../../../../model/pathfinder/ActionViewModel";
import {MultiSelectNoCreate} from "../../../uiBasic/multiSelectNoCreate/MultiSelectNoCreate";
import {ActionViewModelFactory} from "../../../../../factory/ActionViewModelFactory";
import * as style from './actionForm.css';

export interface ActionFormProps {
    type: "edit" | "create";
}

export interface ActionFormState {
    action: ActionViewModel;
}

export class PathfinderActionForm extends React.Component<ActionFormProps, ActionFormState> {

    constructor(props) {
        super(props);
        this.state = {
            action: ActionViewModelFactory.createEmpty(),
        };
    }

    ROUTE = '/V1/Action';

    postData = async (data): Promise<void> => {
        try {
            await axios.post(this.ROUTE, data);
            alert('Created action in database');
            this.setState({action: ActionViewModelFactory.createEmpty()});
        } catch (error) {
            console.log(error)
        }
    };

    handleSubmit = (event): void => {
        event.preventDefault();
        this.postData(this.state)
    };

    handleNameChange = (event): void => {
        const actionVM = this.state.action;
        actionVM.name = event.target.value;
        this.setState({action: actionVM})
    };

    handleRangeTypeChange = (event): void => {
        const actionVM = this.state.action;
        actionVM.rangeType = event.target.value;
        this.setState({action: actionVM})
    };

    handleAttackBonusChange = (event): void => {
        const actionVM = this.state.action;
        if (event.target.value === '') {
            actionVM.attackBonus = null;
        } else {
            actionVM.attackBonus = Number(event.target.value);
        }
        this.setState({action: actionVM})
    };

    handleRangeChange = (event): void => {
        const actionVM = this.state.action;
        if (event.target.value == '') {
            actionVM.range = null;
        } else {
            actionVM.range = Number(event.target.value);
        }
        this.setState({action: actionVM})
    };

    handleDamageDieTypeChange = (event): void => {
        const actionVM = this.state.action;
        if (event.target.value == '') {
            actionVM.damage.diceType = null;
        } else {
            actionVM.damage.diceType = Number(event.target.value);
        }
        this.setState({action: actionVM})
    };

    handleDamageDieCountChange = (event): void => {
        const actionVM = this.state.action;
        if (event.target.value == '') {
            actionVM.damage.diceCount = null;
        } else {
            actionVM.damage.diceCount = Number(event.target.value);
        }
        this.setState({action: actionVM})
    };

    handleIsMagicChange = (event): void => {
        
    };

    handleCritModChange = (event): void => {
        const actionVM = this.state.action;
        if (event.target.value == '') {
            actionVM.critMod = null;
        } else {
            actionVM.critMod = Number(event.target.value);
        }
        this.setState({action: actionVM})
    };

    handleDamageTypeChange = (value, option): void => {
        const actionVM = this.state.action;
        if (option.action == "select-option") {
            actionVM.damageType.damageType = value.map(elem => {
                return elem.value
            });
        }
        this.setState({action: actionVM})
    };

    handleAdditionalInfoChange = (event): void => {
        const actionVM = this.state.action;
        actionVM.additionalInfo = event.target.value;
        this.setState({action: actionVM})
    };

    render(): ReactElement {
        return (
            <div className={style.formContainer}>
                <form onSubmit={this.handleSubmit}>
                    <div className={style.formSegment} style={{height: '40px'}}>
                        <label className={style.formField}>
                            name:
                            <input type={"text"} value={this.state.action.name} onChange={this.handleNameChange}/>
                        </label>
                    </div>
                    <div className={style.formSegment} style={{height: '100px'}}>
                        <label className={style.formField}>
                            range type:
                            <input type={"text"} value={this.state.action.rangeType}
                                   onChange={this.handleRangeTypeChange}/>
                        </label>
                        <label className={style.formField}>
                            range:
                            <input type={"number"} value={this.state.action.getFormattedRange()}
                                   onChange={this.handleRangeChange}/>
                        </label>
                        <label className={style.formField}>
                            attack bonus:
                            <input type={"number"} value={this.state.action.getFormattedAttackBonus()}
                                   onChange={this.handleAttackBonusChange}/>
                        </label>
                    </div>
                    <div className={style.formSegment} style={{height: '65px'}}>
                        <label className={style.formField}>
                            damage:
                            <input
                                type={"text"}
                                className={style.diceField}
                                value={this.state.action.damage.getFormattedDiceCount()}
                                onChange={this.handleDamageDieCountChange}
                            />
                            d
                            <input
                                type={"text"}
                                className={style.diceField}
                                value={this.state.action.damage.getFormattedDiceType()}
                                onChange={this.handleDamageDieTypeChange}
                            />
                        </label>
                        <label className={style.formField}>
                            crit mod:
                            <input type={"number"} value={this.state.action.getFormattedCritMod()}
                                   onChange={this.handleCritModChange}/>
                        </label>
                    </div>
                    <div className={style.formSegment} style={{height: '85px'}}>
                        <label className={style.formField}>
                            type:
                            <MultiSelectNoCreate
                                handleSelectChange={this.handleDamageTypeChange}
                                className={style.damageTypeSelect}
                                selectables={this.state.action.damageType.damageType.map(elem=> {
                                    return {label: elem, value: elem}
                                })}
                                value={this.state.action.damageType.damageType.map(elem=> {
                                    return {label: elem, value: elem}
                                })}
                            />
                        </label>
                        <label className={style.formField}>
                            magical?
                            <input
                                type={"checkbox"}
                                onChange={this.handleIsMagicChange}
                                checked={this.state.action.damageType.isMagic}
                            />
                        </label>
                    </div>
                    <div  className={style.formSegment} style={{height: '90px'}}>
                        <label className={style.formField}>
                            additional info:
                            <input type={"text"} value={this.state.action.additionalInfo}
                                   onChange={this.handleAdditionalInfoChange}/>
                        </label>
                    </div>
                    <button type={"submit"} className={style.formButton}>submit</button>
                </form>
            </div>
        )
    }
}