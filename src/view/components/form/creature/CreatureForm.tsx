import * as React from "react";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import axios from "axios";
import {uuidv4} from "../../helper/helperFunctions";
import {createCreature} from "./helper/creatureCreator";
import {AlignmentSelect} from "./alignment select/AlignmentSelect";
import {SizeSelect} from "./size select/SizeSelect";
import Dropzone from 'react-dropzone-uploader'
import {creature} from "../../componentTypes";
import * as style from "./creatureForm.module.css";
import {CreatureCard} from "../../creaturecard/CreatureCard";


const SELECT_OPTION = "select-option";
const REMOVE_OPTION = "remove-value";
const CREATE_OPTION = "create-option";

interface ICreatureFormProps {
    creature?: creature;
    type: "edit" | "create";
}


interface ICreatureFormState {
    creature: creature;
    creatureData: any[]
    languageData: any[]
    talentData: any[]
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
            skillData: [],
            actionData: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.conditionalCreatureSelect = this.conditionalCreatureSelect.bind(this);
        this.addOneMoreAttackProperty = this.addOneMoreAttackProperty.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAlignmentChange = this.handleAlignmentChange.bind(this);
        this.handleCreatureClassChange = this.handleCreatureClassChange.bind(this);
        this.handleHPChange = this.handleHPChange.bind(this);
        this.handleACChange = this.handleACChange.bind(this);
        this.handleActionsChange = this.handleActionsChange.bind(this);
        this.handleAttackPropertiesNameChange = this.handleAttackPropertiesNameChange.bind(this);
        this.handleAttackPropertiesValueChange = this.handleAttackPropertiesValueChange.bind(this);
        this.handleBaseAtkChange = this.handleBaseAtkChange.bind(this);
        this.handleChallengeChange = this.handleChallengeChange.bind(this);
        this.handleIniChange = this.handleIniChange.bind(this);
        this.handleLanguagesChange = this.handleLanguagesChange.bind(this);
        this.handleMovementChange = this.handleMovementChange.bind(this);
        this.handleSaveThrowsChange = this.handleSaveThrowsChange.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleSkillNameChange = this.handleSkillNameChange.bind(this);
        this.handleSkillLevelChange = this.handleSkillLevelChange.bind(this);
        this.handleStatsChange = this.handleStatsChange.bind(this);
        this.handleTalentsChange = this.handleTalentsChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleXPChange = this.handleXPChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.addOneMoreSkill = this.addOneMoreSkill.bind(this);
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
                                     width="20px"/>{entry.name} CR:{entry.challenge}</div>
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
                                     width="20px"/>{entry.name} CR:{entry.challenge}</div>
                })

            }
        });
        return selectables
    }

    addOneMoreAttackProperty() {
        let creature = this.state.creature;
        creature.attackProperties.push({property: "", name: "", id: uuidv4()});
        this.setState({creature: creature})
    }

    addOneMoreSkill() {
        let creature = this.state.creature;
        creature.skills.push({name:"",level:"",id:uuidv4()});
        this.setState({creature: creature})

    }

    composeSelectableAttributeOptions(attribute: "Talent" | "Action" | "Language") {
        let selectables = [];
        switch (attribute) {
            case "Language":
                this.state.languageData.forEach(elem => {
                    selectables.push({value: elem.name, label: elem.name})
                });
                break;
            case "Action":
                this.state.actionData.forEach(elem => {
                    selectables.push({value: elem.name + " " + elem.damage, label: elem.name + " " + elem.damage})
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
            }).catch(function (error) {
                console.log(error)
            });
        }

        this.getAll("Talent").then(result => {
            if (Array.isArray(result.data)) this.setState({talentData: result.data})
        }).catch(function (error) {
            console.log(error)
        });

        this.getAll("Language").then(result => {
            if (Array.isArray(result.data)) this.setState({languageData: result.data})
        }).catch(function (error) {
            console.log(error)
        });

        this.getAll('Skill').then(result => {
            if (Array.isArray(result.data)) this.setState({skillData: result.data})
        }).catch(function (error) {
            console.log(error)
        });

        this.getAll("Action").then(result => {
            if (Array.isArray(result.data)) this.setState({actionData: result.data})
        }).catch(function (error) {
            console.log(error)
        });

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
        //For the part when this is an edit form
    }

    uploadImage(data: File | string) {
        if (data == null) return true;
        if (typeof data != "string") {
            let file_ext = data.name.substring(data.name.lastIndexOf('.'));
            let filename = this.state.creature.name +'-'+this.state.creature.challenge+ file_ext;
            const formattedFile = new File([data], filename, {type: data.type});
            const form = new FormData();
            form.append('file', formattedFile);
            axios.put(
                '/V1/creature/image', form
            ).then(
                function (result) {
                    console.log(result);
                    return result.data
                }
            ).catch(function (error) {
                console.log(error);
                return false
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.uploadImage(this.state.creature.image);
        let that = this;
            axios.post('/V1/Creature', this.setCreatureImageName()).then(
                function (response) {
                    alert('Created entry in database');
                    that.resetForm()
                }
            ).catch(function (error) {
                console.log(error)
            });

    }

    resetForm() {
        this.setState({creature: createCreature()})
    }

    setCreatureImageName():creature {
        if (this.state.creature.image != null && typeof this.state.creature.image != "string") {
            let creature = this.state.creature;
            creature.image =
                //@ts-ignore
                `images/creatureImages/${creature.name}-${creature.challenge}/${creature.name}-${creature.challenge}${creature.image.name.substring(creature.image.name.lastIndexOf('.'))}`;
            console.log(creature);
            return creature;
        }
        return this.state.creature
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

    typeBoxChecked(typeValue) {
        return this.state.creature.type == typeValue;
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

    handleAttackPropertiesNameChange(event) {
        let creature = this.state.creature;
        creature.attackProperties = creature.attackProperties.map((elem) => {
            if (elem.id + '-name' !== event.target.id) return elem;
            return {name: event.target.value, property: elem.property, id: elem.id};
        });
        this.setState({
            creature: creature
        });
    }

    handleAttackPropertiesValueChange(event) {
        let creature = this.state.creature;
        creature.attackProperties = creature.attackProperties.map((elem) => {
            if (elem.id + '-prop' !== event.target.id) return elem;
            return {name: elem.name, property: event.target.value, id: elem.id};
        });
        this.setState({
            creature: creature
        });
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

    handleImageChange({meta,file},status) {
        let creature = this.state.creature;
        creature.image = file;
        this.setState({creature: creature});
        if (status == "removed") {
            creature.image = null;
            this.setState({creature: creature})
        }
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

    handleSizeChange(value, option) {
        let creature = this.state.creature;
        creature.size = value.value;
        this.setState({creature: creature})
    }

    handleStatsChange(event, stat: "str" | "dex" | "wis" | "int" | "cha" | "con") {
        let creature = this.state.creature;
        creature.stats[stat] = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleSaveThrowsChange(event, saveThrow: "ref" | "will" | "fort") {
        let creature = this.state.creature;
        creature.saveThrows[saveThrow] = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleLanguagesChange(value, option) {
        let creature = this.state.creature;
        if (option.action == SELECT_OPTION || option.action == CREATE_OPTION) {
            creature.languages = value.map(elem => {
                return elem.value
            });
        } else if (option.action == REMOVE_OPTION) {
            creature.languages = creature.languages.filter(elem=> {
                return elem != option.removedValue.value
            })
        }
        this.setState({creature: creature})
    }

    handleSkillNameChange(value, option,id) {
        let creature = this.state.creature;
        creature.skills = creature.skills.map((elem) => {
            if (elem.id !== id) return elem;
            return {name: value.value, level: elem.level, id: elem.id};
        });
        this.setState({
            creature: creature
        });
    }

    handleSkillLevelChange(event,id) {
        let creature = this.state.creature;
        creature.skills = creature.skills.map((elem) => {
            if (elem.id !== id) return elem;
            return {name: elem.name, level: event.target.value, id: elem.id};
        });
        this.setState({
            creature: creature
        });
    }

    handleTalentsChange(value, option) {
        let creature = this.state.creature;
        if (option.action == SELECT_OPTION || option.action==CREATE_OPTION) {
            creature.talents = value.map(elem => {
                return elem.value
            });
        } else if(option.action == REMOVE_OPTION) {
            creature.talents = creature.talents.filter(elem=> {
                return elem != option.removedValue.value;
            })
        }
        this.setState({creature: creature})
    }

    handleActionsChange(value, option) {
        let creature = this.state.creature;
        if (option.action == SELECT_OPTION) {
            let actions = [];
            value.forEach(selectedValue => {
                let action = this.state.actionData.filter(elem => {
                    return elem.name == selectedValue.value.substr(0, selectedValue.value.lastIndexOf(" "))
                });

                actions.push(action[0]);
            });
            let actions_formatted = actions.map(elem => {
                return {
                    name: elem.name,
                    rangeType: elem.rangeType,
                    attackBonus: elem.attackBonus,
                    damage: elem.damage,
                    critmod: elem.critMod,
                    damageType: elem.damageType,
                    additionalInfo: elem.additionalInfo
                }
            });
            creature.actions = creature.actions.concat(actions_formatted);
            let creature_actions_set = [];
            creature.actions.forEach(elem => {
                let filter = creature_actions_set.filter(set_elem => {
                    return elem.name == set_elem.name
                });
                if (filter.length == 0) creature_actions_set.push(elem)
            });
            creature.actions = creature_actions_set;
        } else if (option.action == REMOVE_OPTION) {
            creature.actions = creature.actions.filter(elem => {
                return `${elem.name} ${elem.damage}` != option.removedValue.value
            })
        }
        this.setState({creature: creature})
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
                                <input type="radio" name="creatureType" onChange={this.handleTypeChange}
                                       value={"player"} checked={this.typeBoxChecked("player")}/> player
                                <input type="radio" name="creatureType" onChange={this.handleTypeChange}
                                       value={"monster"} checked={this.typeBoxChecked("monster")}/> monster
                                <input type="radio" name="creatureType" onChange={this.handleTypeChange}
                                       value={"ally"} checked={this.typeBoxChecked("ally")}/> ally
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
                                <AlignmentSelect handleAlignmentChange={this.handleAlignmentChange} value={this.state.creature.alignment}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                creature class:
                                <input type="text" value={this.state.creature.creatureClass}
                                       onChange={this.handleCreatureClassChange}/>
                            </label>
                            <label className={style.multiInputFormArea}>
                                attack Properties:
                                <button type={"button"} onClick={this.addOneMoreAttackProperty}
                                        className={style.formAddButton}>+</button>
                                {
                                    this.state.creature.attackProperties.map((elem, i) => {
                                        return (
                                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}
                                                   key={i}>
                                                name:
                                                <input type="text" value={elem.name} id={elem.id + "-name"}
                                                       key={i + "name"}
                                                       onChange={this.handleAttackPropertiesNameChange}/>
                                                property:
                                                <input type="text" value={elem.property} id={elem.id + "-prop"}
                                                       key={i + "prop"}
                                                       onChange={this.handleAttackPropertiesValueChange}/>
                                            </label>)
                                    })}
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

                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                xp:
                                <input type="number" value={this.state.creature.xp} onChange={this.handleXPChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                size:
                                <SizeSelect handleSizeChange={this.handleSizeChange}
                                            value={{value:this.state.creature.size,label:this.state.creature.size}}
                                />
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                stats:&nbsp;
                                <label>
                                    str:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.stats.str}
                                           onChange={e => this.handleStatsChange(e, "str")}/>
                                </label>
                                <label>
                                    dex:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.stats.dex}
                                           onChange={e => this.handleStatsChange(e, "dex")}/>
                                </label>
                                <label>
                                    int:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.stats.int}
                                           onChange={e => this.handleStatsChange(e, "int")}/>
                                </label>
                                <label>
                                    wis:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.stats.wis}
                                           onChange={e => this.handleStatsChange(e, "wis")}/>
                                </label>
                                <label>
                                    con:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.stats.con}
                                           onChange={e => this.handleStatsChange(e, "con")}/>
                                </label>
                                <label>
                                    cha:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.stats.cha}
                                           onChange={e => this.handleStatsChange(e, "cha")}/>
                                </label>
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                save throws:&nbsp;
                                <label>
                                    ref:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.saveThrows.ref}
                                           onChange={e => this.handleSaveThrowsChange(e, "ref")}/>
                                </label>
                                <label>
                                    will:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.saveThrows.will}
                                           onChange={e => this.handleSaveThrowsChange(e, "will")}/>
                                </label>
                                <label>
                                    fort:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.saveThrows.fort}
                                           onChange={e => this.handleSaveThrowsChange(e, "fort")}/>
                                </label>
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                languages:
                                <CreatableSelect
                                    options={this.composeSelectableAttributeOptions("Language")}
                                    className={style.creatureFormSelect}
                                    value={this.state.creature.languages.map(elem=>{
                                        return ({value:elem, label:elem})
                                    })}
                                    isClearable
                                    isMulti={true}
                                    onChange={this.handleLanguagesChange}
                                />
                            </label>
                            <label className={style.multiInputFormArea}>
                                skills:
                                <button type={"button"} onClick={this.addOneMoreSkill}
                                        className={style.formAddButton}>+</button>
                                {
                                    this.state.creature.skills.map((elem, i) => {
                                        return (
                                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}
                                                   key={i}>
                                                <p className={style.skillLabel}>name:</p>
                                                <CreatableSelect
                                                    options={this.state.skillData.map(elem=>{
                                                        return {value:elem.name,label:elem.name}
                                                    })}
                                                    value={this.state.creature.skills[i].name}
                                                    isClearable
                                                    key={i+"name"}
                                                    className={style.skillFormSelect}
                                                    onChange={(v,o)=>this.handleSkillNameChange(v,o,elem.id)}
                                                />
                                                level:
                                                <input type="text" value={elem.property}
                                                       key={i + "level"}
                                                       className={style.skillLevelInput}
                                                       onChange={e=>this.handleSkillLevelChange(e,elem.id)}/>
                                            </label>)
                                    })}
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                talents:
                                <CreatableSelect
                                    options={this.composeSelectableAttributeOptions("Talent")}
                                    className={style.creatureFormSelect}
                                    value={this.state.creature.talents.map(elem=>{
                                        return ({value:elem, label:elem})
                                    })}
                                    isClearable
                                    isMulti={true}
                                    onChange={this.handleTalentsChange}
                                />
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                actions:
                                <Select
                                    options={this.composeSelectableAttributeOptions("Action")}
                                    className={style.creatureFormSelect}
                                    value={this.state.creature.actions.map(elem=>{
                                        return ({value:`${elem.name} ${elem.damage}`, label:`${elem.name} ${elem.damage}`})
                                    })}
                                    isClearable
                                    isMulti={true}
                                    onChange={this.handleActionsChange}
                                />
                            </label>
                            <label className={style.imageUploadContainer}>
                            <p className={style.imageLabel}>Image:</p>
                            <Dropzone
                                onChangeStatus={this.handleImageChange}
                                maxFiles={1}
                                multiple={false}
                                canCancel={false}
                                accept="image/*"
                                inputContent="Drop an Image"
                                styles={{
                                    dropzone: {
                                        width: "16em",
                                        height: "15em",
                                        float:"right",
                                        color:"lightgrey",
                                        overflow:"hidden",
                                    },
                                    dropzoneActive: { borderColor: 'lightgrey' }
                                }}
                            />
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                <button type={"submit"} className={style.creatureFormSubmit}>submit</button>
                            </label>
                        </div>
                        <div className={`${style.formPart} ${style.formPartCreature}`}>
                            <CreatureCard
                                name={this.state.creature.name}
                                hitpoints={this.state.creature.hitpoints}
                                armorclass={this.state.creature.armorclass}
                                alignment={this.state.creature.alignment}
                                creatureClass={this.state.creature.creatureClass}
                                challenge={this.state.creature.challenge}
                                movement={this.state.creature.movement}
                                ini={this.state.creature.ini}
                                baseAtk={this.state.creature.baseAtk}
                                size={this.state.creature.size}
                                stats={this.state.creature.stats}
                                kmb={0}
                                kmv={0}
                                saveThrows={this.state.creature.saveThrows}
                                actions={this.state.creature.actions}
                                attackProperties={this.state.creature.attackProperties}
                                languages={this.state.creature.languages}
                                skills={this.state.creature.skills}
                                talents={this.state.creature.talents}
                                xp={this.state.creature.xp}
                                preview={true}
                             />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}