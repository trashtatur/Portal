import * as React from "react";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import axios, {AxiosResponse} from "axios";
import {uuidv4} from "../../helper/helperFunctions";
import {createCreature} from "./helper/creatureCreator";
import {AlignmentSelect} from "./alignment select/AlignmentSelect";
import {SizeSelect} from "./size select/SizeSelect";
import Dropzone from 'react-dropzone-uploader'
import {
    actionDataEntry,
    creature,
    languageDataEntry,
    selectableFormElement,
    skillDataEntry,
    talentDataEntry
} from "../../componentTypes";
import {CreatureCard} from "../../creaturecard/CreatureCard";
import {CreatureSeparator} from "../../creaturecard/separator/CreatureSeparator";
import {ReactElement} from "react";
import * as style from "./creatureForm.css";


const SELECT_OPTION = "select-option";
const REMOVE_OPTION = "remove-value";
const CREATE_OPTION = "create-option";

interface CreatureFormProps {
    creature?: creature;
    type: "edit" | "create";
    handleUpdate?: Function;
}


interface CreatureFormState {
    creature: creature;
    languageData: languageDataEntry[];
    talentData: talentDataEntry[];
    skillData: skillDataEntry[];
    actionData: actionDataEntry[];
}

export class CreatureForm extends React.Component<CreatureFormProps, CreatureFormState> {

    constructor(props) {
        super(props);
        this.state = {
            creature: this.props.type == "edit" ? this.props.creature : createCreature(),
            languageData: [],
            talentData: [],
            skillData: [],
            actionData: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.previewImage = this.previewImage.bind(this);
        this.addOneMoreSkill = this.addOneMoreSkill.bind(this);
    }

    addOneMoreAttackProperty(): void {
        const creature = this.state.creature;
        creature.attackProperties.push({property: "", name: "", id: uuidv4()});
        this.setState({creature: creature})
    }

    addOneMoreSkill(): void {
        const creature = this.state.creature;
        creature.skills.push({name: "", level: "", id: uuidv4()});
        this.setState({creature: creature})

    }

    composeSelectableAttributeOptions(attribute: "Talent" | "Action" | "Language"): selectableFormElement[] {
        const selectables = [];
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


    async getAll(whatToGet: "Creature" | "Talent" | "Sense" | "Skill" | "Action" | "Language"): Promise<AxiosResponse> {
        return await axios.get(
            `/V1/${whatToGet}`
        )
    }


    componentDidMount(): void {

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

    previewImage(): null | string {
        // Default case for image
        if (this.state.creature.image == "") return null;
        // Image already existing
        if (typeof this.state.creature.image == "string") return this.state.creature.image;
        // Image in form
        if (this.state.creature.image != null) return URL.createObjectURL(this.state.creature.image);
        // Image in form deleted
        return null;
    }

    uploadImage(data: File | string): AxiosResponse | boolean {
        if (data == null) return true;
        if (typeof data != "string") {
            console.log(data);
            const fileExtension = data.name.substring(data.name.lastIndexOf('.'));
            const filename = this.state.creature.name + '-' + this.state.creature.challenge + fileExtension;
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

    async handleSubmit(event): Promise<void> {
        event.preventDefault();
        this.uploadImage(this.state.creature.image);
        try {
            await axios.post('/V1/Creature', this.setCreatureImageName());
            alert('Created entry in database');
            this.resetForm();
        } catch (error) {
            console.log(error)
        }
    }

    resetForm(): void {
        this.setState({creature: createCreature()})
    }

    setCreatureImageName(): creature {
        if (this.state.creature.image != null) {
            const creature = this.state.creature;
            if (typeof creature.image !== "string") {
                creature.image =
                    `images/creatureImages/${creature.name}-${creature.challenge}/${creature.name}-${creature.challenge}${creature.image.name.substring(creature.image.name.lastIndexOf('.'))}`;
            }
            console.log(creature);
            return creature;
        }
        return this.state.creature
    }

    handleNameChange(event): void {
        const creature = this.state.creature;
        creature.name = event.target.value;
        this.setState({creature: creature})
    }

    handleTypeChange(event): void {
        const creature = this.state.creature;
        creature.type = event.target.value;
        this.setState({creature: creature})
    }

    typeBoxChecked(typeValue): boolean {
        return this.state.creature.type == typeValue;
    }

    handleHPChange(event): void {
        const creature = this.state.creature;
        creature.hitpoints = "";
        if (!isNaN(parseInt(event.target.value))) creature.hitpoints = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleACChange(event): void {
        const creature = this.state.creature;
        creature.armorclass = "";
        if (!isNaN(parseInt(event.target.value))) creature.armorclass = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleAlignmentChange(value): void {
        const creature = this.state.creature;
        creature.alignment = value.value;
        this.setState({creature: creature})
    }

    handleCreatureClassChange(event): void {
        const creature = this.state.creature;
        creature.creatureClass = event.target.value;
        this.setState({creature: creature})
    }

    handleAttackPropertiesNameChange(event): void {
        const creature = this.state.creature;
        creature.attackProperties = creature.attackProperties.map((elem) => {
            if (elem.id + '-name' !== event.target.id) return elem;
            return {name: event.target.value, property: elem.property, id: elem.id};
        });
        this.setState({
            creature: creature
        });
    }

    handleAttackPropertiesValueChange(event): void {
        const creature = this.state.creature;
        creature.attackProperties = creature.attackProperties.map((elem) => {
            if (elem.id + '-prop' !== event.target.id) return elem;
            return {name: elem.name, property: event.target.value, id: elem.id};
        });
        this.setState({
            creature: creature
        });
    }


    handleChallengeChange(event): void {
        const creature = this.state.creature;
        creature.challenge = "";
        if (!isNaN(parseInt(event.target.value))) creature.challenge = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleMovementChange(event): void {
        const creature = this.state.creature;
        creature.movement = "";
        if (!isNaN(parseInt(event.target.value))) creature.movement = parseInt(event.target.value);
        creature.movement = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleIniChange(event): void {
        const creature = this.state.creature;
        creature.ini = "";
        if (!isNaN(parseInt(event.target.value))) creature.ini = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleImageChange({meta, file}, status): void {
        const creature = this.state.creature;
        creature.image = file;
        this.setState({creature: creature});
        if (status == "removed") {
            creature.image = null;
            this.setState({creature: creature})
        }
    }

    handleBaseAtkChange(event): void {
        const creature = this.state.creature;
        creature.baseAtk = "";
        if (!isNaN(parseInt(event.target.value))) creature.baseAtk = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleXPChange(event): void {
        const creature = this.state.creature;
        creature.xp = "";
        if (!isNaN(parseInt(event.target.value))) creature.xp = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleSizeChange(value): void {
        const creature = this.state.creature;
        creature.size = value.value;
        this.setState({creature: creature})
    }

    handleStatsChange(event, stat: "str" | "dex" | "wis" | "int" | "cha" | "con"): void {
        const creature = this.state.creature;
        creature.stats[stat] = "";
        if (!isNaN(parseInt(event.target.value))) creature.stats[stat] = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleSaveThrowsChange(event, saveThrow: "ref" | "will" | "fort"): void {
        const creature = this.state.creature;
        creature.saveThrows[saveThrow] = "";
        if (!isNaN(parseInt(event.target.value))) creature.saveThrows[saveThrow] = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleLanguagesChange(value, option): void {
        const creature = this.state.creature;
        if (option.action == SELECT_OPTION || option.action == CREATE_OPTION) {
            creature.languages = value.map(elem => {
                return elem.value
            });
        } else if (option.action == REMOVE_OPTION) {
            creature.languages = creature.languages.filter(elem => {
                return elem != option.removedValue.value
            })
        }
        this.setState({creature: creature})
    }

    handleSkillNameChange(value, option, id): void {
        const creature = this.state.creature;
        creature.skills = creature.skills.map((elem) => {
            if (elem.id !== id) return elem;
            return {name: value.value, level: elem.level, id: elem.id};
        });
        this.setState({
            creature: creature
        });
    }

    handleSkillLevelChange(event, id): void {
        const creature = this.state.creature;
        creature.skills = creature.skills.map((elem) => {
            if (elem.id !== id) return elem;
            let val = "";
            if (!isNaN(parseInt(event.target.value))) val = event.target.value;
            return {name: elem.name, level: parseInt(val), id: elem.id};
        });
        this.setState({
            creature: creature
        });
    }

    handleTalentsChange(value, option): void {
        const creature = this.state.creature;
        if (option.action == SELECT_OPTION || option.action == CREATE_OPTION) {
            creature.talents = value.map(elem => {
                return elem.value
            });
        } else if (option.action == REMOVE_OPTION) {
            creature.talents = creature.talents.filter(elem => {
                return elem != option.removedValue.value;
            })
        }
        this.setState({creature: creature})
    }

    handleActionsChange(value, option): void {
        const creature = this.state.creature;
        if (option.action == SELECT_OPTION) {
            const actions = [];
            value.forEach(selectedValue => {
                const action = this.state.actionData.filter(elem => {
                    return elem.name == selectedValue.value.substr(0, selectedValue.value.lastIndexOf(" "))
                });

                actions.push(action[0]);
            });
            const actionsFormatted = actions.map(elem => {
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
            creature.actions = creature.actions.concat(actionsFormatted);
            const creatureActionsSet = [];
            creature.actions.forEach(elem => {
                const filter = creatureActionsSet.filter(setElem => {
                    return elem.name == setElem.name
                });
                if (filter.length == 0) creatureActionsSet.push(elem)
            });
            creature.actions = creatureActionsSet;
        } else if (option.action == REMOVE_OPTION) {
            creature.actions = creature.actions.filter(elem => {
                return `${elem.name} ${elem.damage}` != option.removedValue.value
            })
        }
        this.setState({creature: creature})
    }

    render(): ReactElement {

        const ImagePreview = () => {
            return (<span style={{color: "black"}}> Image set. to change, drop another in </span>)
        };
        return (
            <div className={style.creatureFormContainer}>
                <div className={style.actualCreatureForm}>
                    <form onSubmit={e => {
                        this.props.type == "edit" ? this.props.handleUpdate(e) : this.handleSubmit(e)
                    }}>
                        <div className={style.formPart}>
                            <label className={style.formTextInputArea}>
                                <strong>name:</strong>
                                <input type="text"
                                       value={this.state.creature.name}
                                       className={style.creatureFormInput}
                                       placeholder={"e.g. great red wyrm"}
                                       onChange={this.handleNameChange}/>
                            </label>
                            <label className={style.formTextInputArea}>
                                <strong>type:</strong>
                                <div className={style.creatureTypeContainer}>
                                    <input type="radio" name="creatureType" onChange={this.handleTypeChange}
                                           value={"player"} checked={this.typeBoxChecked("player")}/> player
                                    <input type="radio" name="creatureType" onChange={this.handleTypeChange}
                                           value={"monster"} checked={this.typeBoxChecked("monster")}/> monster
                                    <input type="radio" name="creatureType" onChange={this.handleTypeChange}
                                           value={"ally"} checked={this.typeBoxChecked("ally")}/> ally
                                    <input type="radio" name="creatureType" onChange={this.handleTypeChange}
                                           value={"summon"} checked={this.typeBoxChecked("summon")}/> summon
                                </div>
                            </label>
                            <label className={style.formTextInputArea}>
                                <strong>hitpoints:</strong>
                                <input type="number" value={this.state.creature.hitpoints}
                                       onChange={this.handleHPChange}
                                       placeholder={"a creatures life"}
                                       className={style.creatureFormInput}
                                />
                            </label>
                            <label className={style.formTextInputArea}>
                                <strong>armorclass:</strong>
                                <input type="number" value={this.state.creature.armorclass}
                                       onChange={this.handleACChange}
                                       placeholder={"A creatures armor"}
                                       className={style.creatureFormInput}
                                />
                            </label>
                            <label className={style.formSelectContainer}>
                                <strong>alignment:</strong>
                                <AlignmentSelect handleAlignmentChange={this.handleAlignmentChange}
                                                 value={this.state.creature.alignment}
                                />
                            </label>
                            <CreatureSeparator/>
                            <label className={style.formTextInputArea}>
                                <strong>creature type:</strong>
                                <input type="text" value={this.state.creature.creatureClass}
                                       onChange={this.handleCreatureClassChange}
                                       placeholder={"e.g. humanoid (goblin)..."}
                                       className={style.creatureFormInput}
                                />
                            </label>
                            <label className={style.multiInputFormArea}>
                                <strong className={style.multiInputFormLabel}>attack Properties:</strong>
                                <button type={"button"} onClick={this.addOneMoreAttackProperty}
                                        className={style.formAddButton}
                                        style={{marginLeft: "26%"}}
                                >+
                                </button>
                                {
                                    this.state.creature.attackProperties.map((elem, i) => {
                                        return (
                                            <label className={style.formTextInputArea}
                                                   key={i}>
                                                name:&nbsp;
                                                <input type="text" value={elem.name} id={elem.id + "-name"}
                                                       key={i + "name"}
                                                       placeholder={"e.g. brute"}
                                                       className={style.attackPropertyNameField}
                                                       onChange={this.handleAttackPropertiesNameChange}/>
                                                <p className={style.attackPropertyValueLabel}>property:</p>
                                                <textarea value={elem.property} id={elem.id + "-prop"}
                                                          key={i + "prop"}
                                                          className={style.attackPropertyValueField}
                                                          placeholder={"e.g. When the creature hits an enemy with a melee attack," +
                                                          "the enemy takes +5 additional physical damage and is stunned for " +
                                                          "1d4 rounds, if it doesn't succeed a saving throw (FORT) DC 15 ..."}
                                                          onChange={this.handleAttackPropertiesValueChange}/>
                                            </label>)
                                    })}
                            </label>
                            <label className={style.formTextInputArea}>
                                <strong>challenge:</strong>
                                <input type="number" value={this.state.creature.challenge}
                                       onChange={this.handleChallengeChange}
                                       placeholder={"how strong this is"}
                                       className={style.creatureFormInput}
                                />
                            </label>
                            <label className={style.formTextInputArea}>
                                <strong>movement:</strong>
                                <input type="number" value={this.state.creature.movement}
                                       onChange={this.handleMovementChange}
                                       placeholder={"How far this moves"}
                                       className={style.creatureFormInput}
                                />
                            </label>
                            <label className={style.formTextInputArea}>
                                <strong>initiative modifier:</strong>
                                <input type="number"
                                       value={this.state.creature.ini}
                                       onChange={this.handleIniChange}
                                       placeholder={"ini bonus to rolls"}
                                       className={style.creatureFormInput}
                                />
                            </label>
                            <label className={style.formTextInputArea}>
                                <strong>base Attack bonus:</strong>
                                <input type="number" value={this.state.creature.baseAtk}
                                       onChange={this.handleBaseAtkChange}
                                       placeholder={"Bonus to attack rolls"}
                                       className={style.creatureFormInput}
                                />
                            </label>

                            <label className={style.formTextInputArea}>
                                <strong>xp:</strong>
                                <input
                                    type="number" value={this.state.creature.xp}
                                    onChange={this.handleXPChange}
                                    placeholder={"the xp it yields"}
                                    className={style.creatureFormInput}
                                />
                            </label>
                            <CreatureSeparator/>
                            <label className={style.formSelectContainer}>
                                <strong>size:</strong>
                                <SizeSelect handleSizeChange={this.handleSizeChange}
                                            value={{value: this.state.creature.size, label: this.state.creature.size}}
                                />
                            </label>
                            <label className={style.formTextInputArea} style={{height: '13%'}}>
                                <strong>stats:&nbsp;</strong>
                                <div className={style.valBlockContainer}>
                                    <label className={style.singleVal}>
                                        str:&nbsp;
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.stats.str}
                                               onChange={e => this.handleStatsChange(e, "str")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        dex:&nbsp;
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.stats.dex}
                                               onChange={e => this.handleStatsChange(e, "dex")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        con:
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.stats.con}
                                               onChange={e => this.handleStatsChange(e, "con")}/>
                                    </label>

                                </div>
                                <div className={style.valBlockContainer}>
                                    <label className={style.singleVal}>
                                        int:&nbsp;
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.stats.int}
                                               onChange={e => this.handleStatsChange(e, "int")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        wis:&nbsp;
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.stats.wis}
                                               onChange={e => this.handleStatsChange(e, "wis")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        cha:&nbsp;
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.stats.cha}
                                               onChange={e => this.handleStatsChange(e, "cha")}/>
                                    </label>
                                </div>
                            </label>
                            <label className={style.formTextInputArea}>
                                <strong>save throws:&nbsp;</strong>
                                <div className={style.valBlockContainer}>
                                    <label className={style.singleVal}>
                                        ref:
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.saveThrows.ref}
                                               onChange={e => this.handleSaveThrowsChange(e, "ref")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        will:
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.saveThrows.will}
                                               onChange={e => this.handleSaveThrowsChange(e, "will")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        fort:
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.saveThrows.fort}
                                               onChange={e => this.handleSaveThrowsChange(e, "fort")}/>
                                    </label>
                                </div>
                            </label>
                            <label className={style.multiInputFormArea}>
                                <strong className={style.multiInputFormLabel}>skills:</strong>
                                <button type={"button"} onClick={this.addOneMoreSkill}
                                        className={style.formAddButton}
                                        style={{marginLeft: "45%"}}
                                >+
                                </button
                                >
                                {
                                    this.state.creature.skills.map((elem, i) => {
                                        return (
                                            <label className={style.formTextInputArea}
                                                   key={i}>
                                                <p className={style.skillLabel}>name:&nbsp;</p>
                                                <CreatableSelect
                                                    options={this.state.skillData.map(elem => {
                                                        return {value: elem.name, label: elem.name}
                                                    })}
                                                    value={{
                                                        value: this.state.creature.skills[i].name,
                                                        label: this.state.creature.skills[i].name
                                                    }}
                                                    isClearable
                                                    key={i + "name"}
                                                    className={style.skillFormSelect}
                                                    onChange={(v, o) => this.handleSkillNameChange(v, o, elem.id)}
                                                />
                                                level:
                                                <input type="text" value={elem.level}
                                                       key={i + "level"}
                                                       className={style.skillLevelInput}
                                                       onChange={e => this.handleSkillLevelChange(e, elem.id)}/>
                                            </label>)
                                    })}
                            </label>
                            <CreatureSeparator/>
                            <label className={style.formSelectContainer}>
                                <strong>languages:</strong>
                                <CreatableSelect
                                    options={this.composeSelectableAttributeOptions("Language")}
                                    className={style.creatureFormSelect}
                                    value={this.state.creature.languages.map(elem => {
                                        return ({value: elem, label: elem})
                                    })}
                                    isClearable
                                    isMulti={true}
                                    onChange={this.handleLanguagesChange}
                                />
                            </label>
                            <label className={style.formSelectContainer}>
                                <strong>talents:</strong>
                                <CreatableSelect
                                    options={this.composeSelectableAttributeOptions("Talent")}
                                    className={style.creatureFormSelect}
                                    value={this.state.creature.talents.map(elem => {
                                        return ({value: elem, label: elem})
                                    })}
                                    isClearable
                                    isMulti={true}
                                    onChange={this.handleTalentsChange}
                                />
                            </label>
                            <label className={style.formSelectContainer}>
                                <strong>actions:</strong>
                                <Select
                                    options={this.composeSelectableAttributeOptions("Action")}
                                    className={style.creatureFormSelect}
                                    value={this.state.creature.actions.map(elem => {
                                        return ({
                                            value: `${elem.name} ${elem.damage}`,
                                            label: `${elem.name} ${elem.damage}`
                                        })
                                    })}
                                    isClearable
                                    isMulti={true}
                                    onChange={this.handleActionsChange}
                                />
                            </label>
                            <label className={style.imageUploadContainer}>
                                <strong className={style.imageLabel}>Image:</strong>
                                <Dropzone
                                    onChangeStatus={this.handleImageChange}
                                    maxFiles={1}
                                    multiple={false}
                                    canCancel={false}
                                    accept="image/*"
                                    inputContent="Drop an Image"
                                    PreviewComponent={ImagePreview}
                                    styles={{
                                        dropzone: {
                                            width: "30em",
                                            height: "3em",
                                            float: "right",
                                            color: "lightgrey",
                                            overflow: "hidden",
                                        },
                                        dropzoneActive: {borderColor: 'lightgrey'}
                                    }}
                                />
                            </label>
                            <label className={style.formTextInputArea}>
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
                                image={this.previewImage()}
                                preview={true}
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}