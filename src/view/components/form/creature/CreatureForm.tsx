import {creature} from "../../encounter/Encounter";
import * as React from "react";
import Select from 'react-select';
import axios from "axios";
import {createCreature} from "./helper/creatureCreator";
import {formatAttackPropertiesForInput, formatAttackPropertiesFromInput} from "./helper/formatter";
import * as style from "./creatureForm.module.css";


interface ICreatureFormProps {
    creature?: creature;
    type: "edit" | "create";
}


interface ICreatureFormState {
    creature: creature;
    creatureData: any[]
    languageData: any[]
    talentData: any[]
    senseData: any[]
    skillData: any[]
    actionData: any[]
}

export class CreatureForm extends React.Component<ICreatureFormProps, ICreatureFormState> {

    constructor(props) {
        super(props);
        this.state = {
            creature: this.props.type == "edit" ? this.props.creature : createCreature(),
            creatureData: [],
            languageData: [],
            talentData: [],
            senseData: [],
            skillData: [],
            actionData: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getStateValue = this.getStateValue.bind(this);
        this.conditionalCreatureSelect = this.conditionalCreatureSelect.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAlignmentChange = this.handleAlignmentChange.bind(this);
        this.handleCreatureClassChange = this.handleCreatureClassChange.bind(this);
        this.handleHPChange = this.handleHPChange.bind(this);
        this.handleACChange = this.handleACChange.bind(this);
        this.handleActionsChange = this.handleActionsChange.bind(this);
        this.handleAttackPropertiesChange = this.handleAttackPropertiesChange.bind(this);
        this.handleBaseAtkChange = this.handleBaseAtkChange.bind(this);
        this.handleChallengeChange = this.handleChallengeChange.bind(this);
        this.handleIniChange = this.handleIniChange.bind(this);
        this.handleLanguagesChange = this.handleLanguagesChange.bind(this);
        this.handleMovementChange = this.handleMovementChange.bind(this);
        this.handleSaveThrowsChange = this.handleSaveThrowsChange.bind(this);
        this.handleSensesChange = this.handleSensesChange.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleSkillsChange = this.handleSkillsChange.bind(this);
        this.handleStatsChange = this.handleStatsChange.bind(this);
        this.handleTalentsChange = this.handleTalentsChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleXPChange = this.handleXPChange.bind(this);
    }


    /**
     * Composes dropdown to select creatures
     */
    composeSelectableCreatureOptions(): any[] {
        let selectables = [
            {
                label: "monsters",
                options: []
            },
            {
                label: "players",
                options: []
            },
            {
                label: "allies",
                options: []
            }

        ];

        this.state.creatureData.forEach(entry => {
            if (entry.type == "monster") {
                selectables[0].options.push({
                    value: entry.name,
                    label: <div><img src="images/selectableLableIcons/monster-icon.png" height="20px"
                                     width="20px"/>{entry.name}</div>
                })
            } else if (entry.type == "player") {
                selectables[1].options.push({
                    value: entry.name,
                    label: <div><img src="images/selectableLableIcons/player-icon.png" height="20px"
                                     width="20px"/>{entry.name}</div>
                })
            } else if (entry.type == "ally") {
                selectables[2].options.push({
                    value: entry.name,
                    label: <div><img src="images/selectableLableIcons/ally-icon.png" height="20px"
                                     width="20px"/>{entry.name}</div>
                })

            }
        });
        return selectables
    }

    composeSelectableAttributeOptions(attribute: "Talent" | "Sense" | "Skill" | "Action" | "Language") {
        let selectables = [];
        switch (attribute) {
            case "Language":
                this.state.languageData.forEach(elem => {
                    selectables.push({value: elem.name, label: elem.name})
                });
                break;
            case "Sense":
                this.state.senseData.forEach(elem => {
                    selectables.push({value: elem.name, label: elem.name})
                });
                break;
            case "Action":
                this.state.actionData.forEach(elem => {
                    selectables.push({value: elem.name+" "+elem.damage, label: elem.name+" "+elem.damage})
                });
                break;
            case "Skill":
                this.state.skillData.forEach(elem => {
                    selectables.push({value: elem.name, label: elem.name})
                });
                break;
            case "Talent":
                this.state.talentData.forEach(elem => {
                    selectables.push({value: elem.name, label: elem.name})
                });
                break;
            default:
                break;
        }
        return selectables;

    }


    async getAll(whatToGet: "Creature" | "Talent" | "Sense" | "Skill" | "Action" | "Language") {
        return await axios.get(
            `/V1/${whatToGet}`
        )
    }


    componentDidMount(): void {
        if (this.props.type == "edit") {
            this.getAll('Creature').then(result => {
                this.setState({creatureData: result.data})
            }).catch(function (error) {console.log(error)});
        }

        this.getAll("Talent").then(result => {
            if(Array.isArray(result.data)) this.setState({talentData: result.data})
        }).catch(function (error) {console.log(error)});

        this.getAll("Language").then(result => {
            if(Array.isArray(result.data)) this.setState({languageData: result.data})
        }).catch(function (error) {console.log(error)});

        this.getAll('Skill').then(result=>{
            if(Array.isArray(result.data)) this.setState({skillData:result.data})
        }).catch(function (error) {console.log(error)});

        this.getAll("Sense").then(result=> {
            if(Array.isArray(result.data)) this.setState({senseData:result.data})
        }).catch(function (error) {console.log(error)});

        this.getAll("Action").then(result=> {
            if(Array.isArray(result.data)) this.setState({actionData:result.data})
        }).catch(function (error) {console.log(error)});

    }

    conditionalCreatureSelect() {
        if (this.props.type == "edit") {
            return (
                <Select
                    options={this.composeSelectableCreatureOptions()}
                    isSearchable={true}
                    onChange={this.onSelect}
                    className={style.creatureSelectContainer}
                />
            )
        }
    }

    onSelect() {

    }

    getStateValue(value: string) {
        if (this.state.creature != null) {
            return this.state.creature[value]
        }
        return "";
    }

    handleSubmit(event) {
        console.log(this.state.creature);
        axios.post('/V1/Creature',this.state.creature).then(
            function (response) {
                console.log(response)
            }
        ).catch(function (error) {
            console.log(error)
        });
        event.preventDefault();
    }

    handleNameChange(event) {
        let creature = this.state.creature;
        creature.name = event.target.value;
        this.setState({creature: creature})
    }

    handleTypeChange(event) {
        let creature = this.state.creature;
        creature.type = event.target.value;
        this.setState({creature: creature})
    }

    handleHPChange(event) {
        let creature = this.state.creature;
        creature.hitpoints = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleACChange(event) {
        let creature = this.state.creature;
        creature.armorclass = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleAlignmentChange(value, option) {
        let creature = this.state.creature;
        creature.alignment = value.value;
        this.setState({creature: creature})
    }

    handleCreatureClassChange(event) {
        let creature = this.state.creature;
        creature.creatureClass = event.target.value;
        this.setState({creature: creature})
    }

    handleAttackPropertiesChange(event) {
        let creature = this.state.creature;
        creature.attackProperties = formatAttackPropertiesFromInput(event.target.value);
        this.setState({creature: creature})
    }

    handleChallengeChange(event) {
        let creature = this.state.creature;
        creature.challenge = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleMovementChange(event) {
        let creature = this.state.creature;
        creature.movement = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleIniChange(event) {
        let creature = this.state.creature;
        creature.ini = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleBaseAtkChange(event) {
        let creature = this.state.creature;
        creature.baseAtk = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleXPChange(event) {
        let creature = this.state.creature;
        creature.xp = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleSizeChange(value,option) {
        let creature = this.state.creature;
        creature.size = value.value;
        this.setState({creature: creature})
    }

    handleStatsChange(event,stat:"str"|"dex"|"wis"|"int"|"cha"|"con") {
        let creature = this.state.creature;
        creature.stats[stat] = parseInt(event.target.value);
        this.setState({creature:creature})
    }

    handleSaveThrowsChange(event,saveThrow:"ref"|"will"|"fort") {
        let creature = this.state.creature;
        creature.saveThrows[saveThrow] = parseInt(event.target.value);
        this.setState({creature:creature})
    }

    handleLanguagesChange(value,option) {
        let creature = this.state.creature;
        creature.languages = value.map(elem => {
            return elem.value
        });
        this.setState({creature: creature})
    }

    handleSensesChange(value,option) {
        let creature = this.state.creature;
        creature.senses = value.map(elem => {
            return elem.value
        });
        this.setState({creature: creature})
    }

    handleSkillsChange(value,option) {
        let creature = this.state.creature;
        creature.skills = value.map(elem => {
            return elem.value
        });
        this.setState({creature: creature})
    }

    handleTalentsChange(value,option) {
        let creature = this.state.creature;
        creature.talents = value.map(elem => {
            return elem.value
        });
        this.setState({creature: creature})
    }

    handleActionsChange(value,option) {

    }

    render(): any {
        return (
            <div className={style.creatureFormContainer}>
                {this.conditionalCreatureSelect()}
                <div className={style.actualCreatureForm}>
                    <form onSubmit={this.handleSubmit}>
                        <div className={style.formPart}>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                name:
                                <input type="text" value={this.state.creature.name} onChange={this.handleNameChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                type:
                                <input type="radio" name="creatureType" onChange={this.handleTypeChange} value={"player"}/> player
                                <input type="radio" name="creatureType" onChange={this.handleTypeChange} value={"monster"}/> monster
                                <input type="radio" name="creatureType" onChange={this.handleTypeChange} value={"ally"}/> ally
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                hitpoints:
                                <input type="number" value={this.state.creature.hitpoints}
                                       onChange={this.handleHPChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                armorclass:
                                <input type="number" value={this.state.creature.armorclass}
                                       onChange={this.handleACChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                alignment:
                                <Select
                                    options={[
                                        {value: "chaotic evil", label: "chaotic evil"},
                                        {value: "neutral evil", label: "neutral evil"},
                                        {value: "lawful evil", label: "lawful evil"},
                                        {value: "chaotic neutral", label: "chaotic neutral"},
                                        {value: "neutral", label: "neutral"},
                                        {value: "lawful neutral", label: "lawful neutral"},
                                        {value: "chaotic good", label: "chaotic good"},
                                        {value: "neutral good", label: "neutral good"},
                                        {value: "lawful good", label: "lawful good"}
                                    ]}
                                    onChange={this.handleAlignmentChange}
                                    className={style.creatureFormSelect}
                                />
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                creature class:
                                <input type="text" value={this.state.creature.creatureClass}
                                       onChange={this.handleCreatureClassChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                attackProperties:
                                <input disabled={true} type="text" value={formatAttackPropertiesForInput(this.state.creature.attackProperties)}
                                       onChange={this.handleAttackPropertiesChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                challenge:
                                <input type="number" value={this.state.creature.challenge}
                                       onChange={this.handleChallengeChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                movement:
                                <input type="number" value={this.state.creature.movement}
                                       onChange={this.handleMovementChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                initiative modifier:
                                <input type="number" value={this.state.creature.ini} onChange={this.handleIniChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                base Attack bonus:
                                <input type="number" value={this.state.creature.baseAtk}
                                       onChange={this.handleBaseAtkChange}/>
                            </label>
                        </div>
                        <div className={style.formPart}>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                xp:
                                <input type="number" value={this.state.creature.xp} onChange={this.handleXPChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                size:
                                <Select
                                    options={[
                                        {value: "fine", label: "fine"},
                                        {value: "diminutive", label: "diminutive"},
                                        {value: "tiny", label: "tiny"},
                                        {value: "small", label: "small"},
                                        {value: "medium", label:"medium"},
                                        {value: "large", label:"large"},
                                        {value: "huge", label:"huge"},
                                        {value: "gargantuan", label:"gargantuan"},
                                        {value: "colossal", label:"colossal"}
                                    ]}
                                    onChange={this.handleSizeChange}
                                    className={style.creatureFormSelect}
                                />
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                stats:
                                <label>
                                    str:
                                    <input className={style.subInput} type="number" value={this.state.creature.stats.str}
                                           onChange={e=>this.handleStatsChange(e,"str")}/>
                                </label>
                                <label>
                                    dex:
                                    <input className={style.subInput} type="number" value={this.state.creature.stats.dex}
                                           onChange={e=>this.handleStatsChange(e,"dex")}/>
                                </label>
                                <label>
                                    int:
                                    <input className={style.subInput} type="number" value={this.state.creature.stats.int}
                                           onChange={e=>this.handleStatsChange(e,"int")}/>
                                </label>
                                <label>
                                    wis:
                                    <input className={style.subInput} type="number" value={this.state.creature.stats.wis}
                                           onChange={e=>this.handleStatsChange(e,"wis")}/>
                                </label>
                                <label>
                                    con:
                                    <input className={style.subInput} type="number" value={this.state.creature.stats.con}
                                           onChange={e=>this.handleStatsChange(e,"con")}/>
                                </label>
                                <label>
                                    cha:
                                    <input className={style.subInput} type="number" value={this.state.creature.stats.cha}
                                           onChange={e=>this.handleStatsChange(e,"cha")}/>
                                </label>
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                save throws:
                                <label>
                                    ref:
                                    <input className={style.subInput} type="number" value={this.state.creature.saveThrows.ref}
                                           onChange={e=>this.handleSaveThrowsChange(e,"ref")}/>
                                </label>
                                <label>
                                    will:
                                    <input className={style.subInput} type="number" value={this.state.creature.saveThrows.will}
                                           onChange={e=>this.handleSaveThrowsChange(e,"will")}/>
                                </label>
                                <label>
                                    fort:
                                    <input className={style.subInput} type="number" value={this.state.creature.saveThrows.fort}
                                           onChange={e=>this.handleSaveThrowsChange(e,"fort")}/>
                                </label>
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                languages:
                                <Select
                                    options={this.composeSelectableAttributeOptions("Language")}
                                    className={style.creatureFormSelect}
                                    isMulti={true}
                                    onChange={this.handleLanguagesChange}
                                />
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                senses:
                                <Select
                                    options={this.composeSelectableAttributeOptions("Sense")}
                                    className={style.creatureFormSelect}
                                    isMulti={true}
                                    onChange={this.handleSensesChange}
                                />
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                skills:
                                <Select
                                    options={this.composeSelectableAttributeOptions("Skill")}
                                    className={style.creatureFormSelect}
                                    isMulti={true}
                                    onChange={this.handleSkillsChange}
                                />
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                talents:
                                <Select
                                    options={this.composeSelectableAttributeOptions("Talent")}
                                    className={style.creatureFormSelect}
                                    isMulti={true}
                                    onChange={this.handleTalentsChange}
                                />
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                actions:
                                <Select
                                    options={this.composeSelectableAttributeOptions("Action")}
                                    className={style.creatureFormSelect}
                                    isMulti={true}
                                    onChange={this.handleActionsChange}
                                />
                            </label>
                        </div>
                        <input className={style.creatureFormSubmit} type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        )
    }
}