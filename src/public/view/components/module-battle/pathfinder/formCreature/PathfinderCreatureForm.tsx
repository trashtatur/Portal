import * as React from "react";
import {ReactElement} from "react";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import axios, {AxiosResponse} from "axios";
import {setCreatureImageName, uploadImage} from "../../../../../service/helperFunctions";
import {AlignmentSelect} from "./alignment select/AlignmentSelect";
import {SizeSelect} from "./size select/SizeSelect";
import Dropzone from 'react-dropzone-uploader'
import {selectable} from "@/public/types/frontendTypes";
import {CreatureCard} from "../creaturecard/CreatureCard";
import {RedFadeLine} from "../../../uiBasic/redFadeLine/RedFadeLine";
import {SelectEventTypesEnum} from "@/public/model/enumeration/SelectEventTypesEnum";
import {CreatureViewModel} from "@/public/model/CreatureViewModel";
import {CreatureViewModelFactory} from "@/public/factory/CreatureViewModelFactory";
import {LanguageViewModel} from "@/public/model/pathfinder/LanguageViewModel";
import {TalentViewModel} from "@/public/model/pathfinder/TalentViewModel";
import {SkillViewModel} from "@/public/model/pathfinder/SkillViewModel";
import {ActionViewModel} from "@/public/model/pathfinder/ActionViewModel";
import {NamedPropertyViewModel} from "@/public/model/dataModel/NamedPropertyViewModel";
import {PathfinderCreaturePropertiesViewModel} from "@/public/model/pathfinder/PathfinderCreaturePropertiesViewModel";
import {PathfinderTalentDataToViewModelMapper} from "@/public/mapping/pathfinder/PathfinderTalentDataToViewModelMapper";
import {PathfinderLanguageDataToViewModelMapper} from "@/public/mapping/pathfinder/PathfinderLanguageDataToViewModelMapper";
import {PathfinderSkillDataToViewModelMapper} from "@/public/mapping/pathfinder/PathfinderSkillDataToViewModelMapper";
import {PathfinderActionDataToViewModelMapper} from "@/public/mapping/pathfinder/PathfinderActionDataToViewModelMapper";
import * as style from "./pathfinderCreatureForm.css";

interface CreatureFormProps {
    creature?: CreatureViewModel<PathfinderCreaturePropertiesViewModel>;
    type: "edit" | "create";
    handleUpdate?: Function;
}

interface CreatureFormState {
    creature: CreatureViewModel<PathfinderCreaturePropertiesViewModel>;
    languageData: LanguageViewModel[];
    talentData: TalentViewModel[];
    skillData: SkillViewModel[];
    actionData: ActionViewModel[];
}

export class PathfinderCreatureForm extends React.Component<CreatureFormProps, CreatureFormState> {

    constructor(props) {
        super(props);
        this.state = {
            creature: this.props.type == "edit" ?
                this.props.creature :
                this.creatureViewModelFactory.createEmpty(PathfinderCreaturePropertiesViewModel),
            languageData: [],
            talentData: [],
            skillData: [],
            actionData: []
        };
    }

    creatureViewModelFactory = new CreatureViewModelFactory();

    addOneMoreAttackProperty = (): void => {
        const creature = this.state.creature;
        creature.properties.attackProperties.push(new NamedPropertyViewModel('',''))
        this.setState({creature: creature})
    };

    addOneMoreSkill = (): void => {
        const creature = this.state.creature;
        creature.properties.skills.push(new SkillViewModel('','',null))
        this.setState({creature: creature})

    };

    composeSelectableAttributeOptions = (attribute: "Talent" | "Action" | "Language"): selectable[] => {
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
    };

    getAll = async(whatToGet: "Creature" | "Talent" | "Sense" | "Skill" | "Action" | "Language"): Promise<AxiosResponse> => {
        return await axios.get(
            `/V1/Pathfinder/${whatToGet}`
        )
    };

    componentDidMount = (): void => {

        this.getAll("Talent").then(result => {
            if (Array.isArray(result.data)) {
                const talentDataMappper = new PathfinderTalentDataToViewModelMapper()
                const talentViewModels = talentDataMappper.mapMultiple(result.data)
                this.setState({talentData: talentViewModels})
            }
        }).catch(function (error) {
            console.log(error)
        });

        this.getAll("Language").then(result => {
            if (Array.isArray(result.data)) {
                const languageDataMapper = new PathfinderLanguageDataToViewModelMapper();
                const languageViewModels = languageDataMapper.mapMultiple(result.data)
                this.setState({languageData: languageViewModels})
            }
        }).catch(function (error) {
            console.log(error)
        });

        this.getAll('Skill').then(result => {
            if (Array.isArray(result.data)) {
                const skillDataMapper = new PathfinderSkillDataToViewModelMapper();
                const skillViewModels = skillDataMapper.mapMultiple(result.data)
                this.setState({skillData: skillViewModels})
            }
        }).catch(function (error) {
            console.log(error)
        });

        this.getAll("Action").then(result => {
            if (Array.isArray(result.data)) {
                const actionDataMapper = new PathfinderActionDataToViewModelMapper();
                const actionViewModels = actionDataMapper.mapMultiple(result.data)
                this.setState({actionData: actionViewModels})
            }
        }).catch(function (error) {
            console.log(error)
        });
    };

    previewImage = (): null | string => {
        // Default case for image
        if (this.state.creature.properties.image == "") return null;
        // Image already existing
        if (typeof this.state.creature.properties.image == "string") return this.state.creature.properties.image;
        // Image in form
        if (this.state.creature.properties.image != null) return URL.createObjectURL(this.state.creature.properties.image);
        // Image in form deleted
        return null;
    };

    handleSubmit = async(event): Promise<void> =>{
        event.preventDefault();
        uploadImage(this.state.creature.properties.image, this.state.creature.name, this.state.creature.properties.challenge);
        try {
            const creature = this.state.creature;
            if (typeof creature.properties.image !== "string") {
                creature.properties.image =
                    setCreatureImageName(creature.name, creature.properties.challenge, creature.properties.image);
            }
            await axios.post('/V1/Creature/pathfinder', creature);
            alert('Created entry in database');
            this.resetForm();
        } catch (error) {
            console.log(error)
        }
    };

    resetForm = (): void => {
        this.setState(
            {creature: this.creatureViewModelFactory.createEmpty(PathfinderCreaturePropertiesViewModel)}
            )
    };

    handleNameChange = (event): void => {
        const creature = this.state.creature;
        creature.name = event.target.value;
        this.setState({creature: creature})
    };

    handleTypeChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.type = event.target.value;
        this.setState({creature: creature})
    };

    typeBoxChecked = (typeValue): boolean => {
        return this.state.creature.properties.type == typeValue;
    };

    handleHPChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.hitpoints = null;
        if (!isNaN(parseInt(event.target.value))) creature.properties.hitpoints = parseInt(event.target.value);
        this.setState({creature: creature})
    };

    handleACChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.armorclass = null;
        if (!isNaN(parseInt(event.target.value))) creature.properties.armorclass = parseInt(event.target.value);
        this.setState({creature: creature})
    };

    handleAlignmentChange = (value): void => {
        const creature = this.state.creature;
        creature.properties.alignment = value.value;
        this.setState({creature: creature})
    };

    handleCreatureClassChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.creatureClass = event.target.value;
        this.setState({creature: creature})
    };

    handleAttackPropertiesNameChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.attackProperties = creature.properties.attackProperties.map((elem) => {
            if (elem.name + '-name' !== event.target.id) return elem;
            elem.name = event.target.value;
            return elem;
        });
        this.setState({
            creature: creature
        });
    };

    handleAttackPropertiesValueChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.attackProperties = creature.properties.attackProperties.map((elem) => {
            if (elem.name + '-prop' !== event.target.id) return elem;
            elem.property = event.target.value;
            return elem;
        });
        this.setState({
            creature: creature
        });
    };

    handleChallengeChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.challenge = null;
        if (!isNaN(parseInt(event.target.value))) creature.properties.challenge = parseInt(event.target.value);
        this.setState({creature: creature})
    };

    handleMovementChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.movement = null;
        if (!isNaN(parseInt(event.target.value))) creature.properties.movement = parseInt(event.target.value);
        creature.properties.movement = parseInt(event.target.value);
        this.setState({creature: creature})
    };

    handleIniChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.ini = null;
        if (!isNaN(parseInt(event.target.value))) creature.properties.ini = parseInt(event.target.value);
        this.setState({creature: creature})
    };

    handleImageChange = ({meta, file}, status): void => {
        const creature = this.state.creature;
        creature.properties.image = file;
        this.setState({creature: creature});
        if (status == "removed") {
            creature.properties.image = null;
            this.setState({creature: creature})
        }
    };

    handleBaseAtkChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.baseAtk = null;
        if (!isNaN(parseInt(event.target.value))) creature.properties.baseAtk = parseInt(event.target.value);
        this.setState({creature: creature})
    };

    handleXPChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.xp = null;
        if (!isNaN(parseInt(event.target.value))) creature.properties.xp = parseInt(event.target.value);
        this.setState({creature: creature})
    };

    handleSizeChange = (value): void => {
        const creature = this.state.creature;
        creature.properties.size = value.value;
        this.setState({creature: creature})
    };

    handleStatsChange = (event, stat: "str" | "dex" | "wis" | "int" | "cha" | "con"): void => {
        const creature = this.state.creature;
        creature.properties.stats[stat] = "";
        if (!isNaN(parseInt(event.target.value))) creature.properties.stats[stat] = parseInt(event.target.value);
        this.setState({creature: creature})
    };

    handleSaveThrowsChange = (event, saveThrow: "ref" | "will" | "fort"): void => {
        const creature = this.state.creature;
        creature.properties.saveThrows[saveThrow] = null;
        if (!isNaN(parseInt(event.target.value))) creature.properties.saveThrows[saveThrow] = parseInt(event.target.value);
        this.setState({creature: creature})
    };

    handleLanguagesChange = (value, option): void => {
        const creature = this.state.creature;
        if (option.action == SelectEventTypesEnum.SELECT_OPTION || option.action == SelectEventTypesEnum.CREATE_OPTION) {
            creature.properties.languages = value.map(elem => {
                return new LanguageViewModel(null, elem.value)
            });
        } else if (option.action == SelectEventTypesEnum.REMOVE_OPTION) {
            creature.properties.languages = creature.properties.languages.filter(elem => {
                return elem.name != option.removedValue.value
            })
        }
        this.setState({creature: creature})
    };

    handleSkillNameChange = (value, option, id): void => {
        const creature = this.state.creature;
        creature.properties.skills = creature.properties.skills.map((elem) => {
            if (elem.id !== id) return elem;
            elem.name = value.value;
            return elem;
        });
        this.setState({
            creature: creature
        });
    };

    handleSkillLevelChange = (event, id): void => {
        const creature = this.state.creature;
        creature.properties.skills = creature.properties.skills.map((elem) => {
            if (elem.id !== id) return elem;
            let val = "";
            if (!isNaN(parseInt(event.target.value))) val = event.target.value;
            elem.level = parseInt(val)
            return elem
        });
        this.setState({
            creature: creature
        });
    };

    handleTalentsChange = (value, option): void => {
        const creature = this.state.creature;
        if (option.action == SelectEventTypesEnum.SELECT_OPTION || option.action == SelectEventTypesEnum.CREATE_OPTION) {
            creature.properties.talents = value.map(elem => {
                return elem.value
            });
        } else if (option.action == SelectEventTypesEnum.REMOVE_OPTION) {
            creature.properties.talents = creature.properties.talents.filter(elem => {
                return elem != option.removedValue.value;
            })
        }
        this.setState({creature: creature})
    };

    handleActionsChange = (value, option): void => {
        const creature = this.state.creature;
        if (option.action == SelectEventTypesEnum.SELECT_OPTION) {
            const actions: ActionViewModel[] = [];
            value.forEach(selectedValue => {
                const action = this.state.actionData.filter(elem => {
                    return elem.name == selectedValue.value.substr(0, selectedValue.value.lastIndexOf(" "))
                });

                actions.push(action[0]);
            });
            creature.properties.actions = creature.properties.actions.concat(actions);
            const creatureActionsSet = [];
            creature.properties.actions.forEach(elem => {
                const filter = creatureActionsSet.filter(setElem => {
                    return elem.name == setElem.name
                });
                if (filter.length == 0) creatureActionsSet.push(elem)
            });
            creature.properties.actions = creatureActionsSet;
        } else if (option.action == SelectEventTypesEnum.REMOVE_OPTION) {
            creature.properties.actions = creature.properties.actions.filter(elem => {
                return `${elem.name} ${elem.damage}` != option.removedValue.value
            })
        }
        this.setState({creature: creature})
    };

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
                                <input type="number" value={this.state.creature.properties.hitpoints}
                                       onChange={this.handleHPChange}
                                       placeholder={"a creatures life"}
                                       className={style.creatureFormInput}
                                />
                            </label>
                            <label className={style.formTextInputArea}>
                                <strong>armorclass:</strong>
                                <input type="number" value={this.state.creature.properties.armorclass}
                                       onChange={this.handleACChange}
                                       placeholder={"A creatures armor"}
                                       className={style.creatureFormInput}
                                />
                            </label>
                            <label className={style.formSelectContainer}>
                                <strong>alignment:</strong>
                                <AlignmentSelect handleAlignmentChange={this.handleAlignmentChange}
                                                 value={this.state.creature.properties.alignment}
                                />
                            </label>
                            <RedFadeLine/>
                            <label className={style.formTextInputArea}>
                                <strong>creature type:</strong>
                                <input type="text" value={this.state.creature.properties.creatureClass}
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
                                {   this.state.creature.properties.attackProperties &&
                                    this.state.creature.properties.attackProperties.map((elem, i) => {
                                        return (
                                            <label className={style.formTextInputArea}
                                                   key={i}>
                                                name:&nbsp;
                                                <input type="text" value={elem.name} id={elem.name + "-name"}
                                                       key={i + "name"}
                                                       placeholder={"e.g. brute"}
                                                       className={style.attackPropertyNameField}
                                                       onChange={this.handleAttackPropertiesNameChange}/>
                                                <p className={style.attackPropertyValueLabel}>property:</p>
                                                <textarea value={elem.property} id={elem.name + "-prop"}
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
                                <input type="number" value={this.state.creature.properties.challenge}
                                       onChange={this.handleChallengeChange}
                                       placeholder={"how strong this is"}
                                       className={style.creatureFormInput}
                                />
                            </label>
                            <label className={style.formTextInputArea}>
                                <strong>movement:</strong>
                                <input type="number" value={this.state.creature.properties.movement}
                                       onChange={this.handleMovementChange}
                                       placeholder={"How far this moves"}
                                       className={style.creatureFormInput}
                                />
                            </label>
                            <label className={style.formTextInputArea}>
                                <strong>initiative modifier:</strong>
                                <input type="number"
                                       value={this.state.creature.properties.ini}
                                       onChange={this.handleIniChange}
                                       placeholder={"ini bonus to rolls"}
                                       className={style.creatureFormInput}
                                />
                            </label>
                            <label className={style.formTextInputArea}>
                                <strong>base Attack bonus:</strong>
                                <input type="number" value={this.state.creature.properties.baseAtk}
                                       onChange={this.handleBaseAtkChange}
                                       placeholder={"Bonus to attack rolls"}
                                       className={style.creatureFormInput}
                                />
                            </label>

                            <label className={style.formTextInputArea}>
                                <strong>xp:</strong>
                                <input
                                    type="number" value={this.state.creature.properties.xp}
                                    onChange={this.handleXPChange}
                                    placeholder={"the xp it yields"}
                                    className={style.creatureFormInput}
                                />
                            </label>
                            <RedFadeLine/>
                            <label className={style.formSelectContainer}>
                                <strong>size:</strong>
                                <SizeSelect handleSizeChange={this.handleSizeChange}
                                            value={{value: this.state.creature.properties.size, label: this.state.creature.properties.size}}
                                />
                            </label>
                            <label className={style.formTextInputArea} style={{height: '13%'}}>
                                <strong>stats:&nbsp;</strong>
                                <div className={style.valBlockContainer}>
                                    <label className={style.singleVal}>
                                        str:&nbsp;
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.properties.stats.strength}
                                               onChange={e => this.handleStatsChange(e, "str")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        dex:&nbsp;
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.properties.stats.dexterity}
                                               onChange={e => this.handleStatsChange(e, "dex")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        con:
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.properties.stats.constitution}
                                               onChange={e => this.handleStatsChange(e, "con")}/>
                                    </label>

                                </div>
                                <div className={style.valBlockContainer}>
                                    <label className={style.singleVal}>
                                        int:&nbsp;
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.properties.stats.intelligence}
                                               onChange={e => this.handleStatsChange(e, "int")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        wis:&nbsp;
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.properties.stats.wisdom}
                                               onChange={e => this.handleStatsChange(e, "wis")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        cha:&nbsp;
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.properties.stats.charisma}
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
                                               value={this.state.creature.properties.saveThrows.reflex}
                                               onChange={e => this.handleSaveThrowsChange(e, "ref")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        will:
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.properties.saveThrows.wisdom}
                                               onChange={e => this.handleSaveThrowsChange(e, "will")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        fort:
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.properties.saveThrows.fortitude}
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
                                    this.state.creature.properties.skills &&
                                    this.state.creature.properties.skills.map((elem, i) => {
                                        return (
                                            <label className={style.formTextInputArea}
                                                   key={i}>
                                                <p className={style.skillLabel}>name:&nbsp;</p>
                                                <CreatableSelect
                                                    options={this.state.skillData.map(elem => {
                                                        return {value: elem.name, label: elem.name}
                                                    })}
                                                    value={{
                                                        value: this.state.creature.properties.skills[i].name,
                                                        label: this.state.creature.properties.skills[i].name
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
                            <RedFadeLine/>
                            <label className={style.formSelectContainer}>
                                <strong>languages:</strong>
                                <CreatableSelect
                                    options={this.composeSelectableAttributeOptions("Language")}
                                    className={style.creatureFormSelect}
                                    value={
                                        this.state.creature.properties.languages &&
                                        this.state.creature.properties.languages.map(elem => {
                                        return ({value: elem.name, label: elem.name})
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
                                    value={
                                        this.state.creature.properties.talents &&
                                        this.state.creature.properties.talents.map(elem => {
                                        return ({value: elem.name, label: elem.name})
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
                                    value={
                                        this.state.creature.properties.actions &&
                                        this.state.creature.properties.actions.map(elem => {
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
                                hitpoints={this.state.creature.properties.hitpoints}
                                armorclass={this.state.creature.properties.armorclass}
                                alignment={this.state.creature.properties.alignment}
                                creatureClass={this.state.creature.properties.creatureClass}
                                challenge={this.state.creature.properties.challenge}
                                movement={this.state.creature.properties.movement}
                                ini={this.state.creature.properties.ini}
                                baseAtk={this.state.creature.properties.baseAtk}
                                size={this.state.creature.properties.size}
                                stats={this.state.creature.properties.stats}
                                saveThrows={this.state.creature.properties.saveThrows}
                                actions={this.state.creature.properties.actions}
                                attackProperties={this.state.creature.properties.attackProperties}
                                languages={this.state.creature.properties.languages}
                                skills={this.state.creature.properties.skills}
                                talents={this.state.creature.properties.talents}
                                xp={this.state.creature.properties.xp}
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