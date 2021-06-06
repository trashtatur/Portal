import * as React from "react";
import {ReactElement} from "react";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import axios, {AxiosResponse} from "axios";
import {AlignmentSelect} from "../../common/alignment select/AlignmentSelect";
import {SizeSelect} from "./size select/SizeSelect";
import Dropzone from 'react-dropzone-uploader'
import {selectable} from "@/public/types/frontendTypes";
import {CreatureCard} from "../creaturecard/CreatureCard";
import {RedFadeLine} from "../../../uiBasic/redFadeLine/RedFadeLine";
import {SelectEventTypesEnum} from "@/public/model/enumeration/SelectEventTypesEnum";
import {CreatureViewModel} from "@/public/model/CreatureViewModel";
import {CreatureViewModelFactory} from "@/public/factory/CreatureViewModelFactory";
import {PathfinderLanguageViewModel} from "@/public/model/pathfinder/PathfinderLanguageViewModel";
import {PathfinderTalentViewModel} from "@/public/model/pathfinder/PathfinderTalentViewModel";
import {PathfinderSkillViewModel} from "@/public/model/pathfinder/PathfinderSkillViewModel";
import {PathfinderActionViewModel} from "@/public/model/pathfinder/PathfinderActionViewModel";
import {NamedPropertyViewModel} from "@/public/model/NamedPropertyViewModel";
import {PathfinderCreaturePropertiesViewModel} from "@/public/model/pathfinder/PathfinderCreaturePropertiesViewModel";
import {serialize} from "typescript-json-serializer";
import {uuidv4} from "@/public/service/uuid.service";
import {uploadCreatureImage} from "@/public/service/http.service";
import {setCreatureImagePath} from "@/public/service/imagePath.service";
import {deserializeMultiple} from "@/public/service/serializer.service";
import * as style from "./pathfinderCreatureForm.css";

interface CreatureFormProps {
    creature?: CreatureViewModel<PathfinderCreaturePropertiesViewModel>;
    type: "edit" | "create";
    handleUpdate?: Function;
}

interface CreatureFormState {
    creature: CreatureViewModel<PathfinderCreaturePropertiesViewModel>;
    languageData: PathfinderLanguageViewModel[];
    talentData: PathfinderTalentViewModel[];
    skillData: PathfinderSkillViewModel[];
    actionData: PathfinderActionViewModel[];
    skillFields: {skill: PathfinderSkillViewModel; id: string}[];
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
            actionData: [],
            skillFields: []
        };
    }

    creatureViewModelFactory = new CreatureViewModelFactory();

    addOneMoreAttackProperty = (): void => {
        const creature = this.state.creature;
        creature.creatureProperties.attackProperties.push(new NamedPropertyViewModel('', ''))
        this.setState({creature: creature})
    };

    addOneMoreSkill = (): void => {
        this.setState({skillFields: this.state.skillFields.concat(
                [{skill: new PathfinderSkillViewModel('','', 0), id: uuidv4()}]
            )})
    };

    composeSelectableAttributeOptions = (attribute: "Talent" | "Action" | "Language"): selectable[] => {
        const selectables: selectable[] = [];
        switch (attribute) {
            case "Language":
                this.state.languageData.forEach(elem => {
                    selectables.push({value: elem.name, label: elem.name})
                });
                break;
            case "Action":
                this.state.actionData.forEach(elem => {
                    selectables.push(
                        {
                            value: elem.name,
                            label: elem.name + " " + elem.damage.getFullDiceRollString(),
                            additionalInfoProperty: elem.damage
                        }
                    )
                });
                break;
            case "Talent":
                this.state.talentData.forEach(elem => {
                    selectables.push(
                        {
                            value: elem.name,
                            label: elem.name,
                            additionalInfoProperty: elem.type
                        }
                    )
                });
                break;
            default:
                break;
        }
        return selectables;
    };

    getAll = async (whatToGet: "Creature" | "Talent" | "Sense" | "Skill" | "Action" | "Language"): Promise<AxiosResponse> => {
        return await axios.get(
            `/V1/Pathfinder/${whatToGet}`
        )
    };

    componentDidMount = (): void => {

        this.getAll("Talent").then(result => {
            if (Array.isArray(result.data)) {
                const talentViewModels = deserializeMultiple(result.data, PathfinderTalentViewModel)
                this.setState({talentData: talentViewModels})
            }
        }).catch(function (error) {
            console.log(error)
        });

        this.getAll("Language").then(result => {
            if (Array.isArray(result.data)) {
                const languageViewModels = deserializeMultiple(result.data, PathfinderLanguageViewModel)
                this.setState({languageData: languageViewModels})
            }
        }).catch(function (error) {
            console.log(error)
        });

        this.getAll('Skill').then(result => {
            if (Array.isArray(result.data)) {
                const skillViewModels = deserializeMultiple(result.data, PathfinderSkillViewModel)
                this.setState({skillData: skillViewModels})
            }
        }).catch(function (error) {
            console.log(error)
        });
        this.getAll("Action").then(result => {
            if (Array.isArray(result.data)) {
                const actionViewModels = deserializeMultiple(result.data, PathfinderActionViewModel)
                this.setState({actionData: actionViewModels})
            }
        }).catch(function (error) {
            console.log(error)
        });
    };

    previewImage = (): null | string => {
        // Default case for image
        if (this.state.creature.creatureProperties.image == "") return null;
        // Image already existing
        if (typeof this.state.creature.creatureProperties.image == "string") return this.state.creature.creatureProperties.image;
        // Image in form
        if (this.state.creature.creatureProperties.image != null) return URL.createObjectURL(this.state.creature.creatureProperties.image);
        // Image in form deleted
        return null;
    };

    handleSubmit = async (event): Promise<void> => {
        event.preventDefault();
        uploadCreatureImage(this.state.creature.creatureProperties.image, this.state.creature.name, this.state.creature.creatureProperties.challenge);
        try {
            const creature = this.state.creature;
            if (typeof creature.creatureProperties.image !== "string") {
                creature.creatureProperties.image =
                    setCreatureImagePath(creature.name, creature.creatureProperties.challenge, creature.creatureProperties.image);
            }
            creature.creatureProperties = serialize(creature.creatureProperties)
            await axios.post('/V1/Creature/pathfinder', serialize(creature));
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
        creature.creatureProperties.type = event.target.value;
        this.setState({creature: creature})
    };

    typeBoxChecked = (typeValue): boolean => {
        return this.state.creature.creatureProperties.type == typeValue;
    };

    handleHPChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.hitpoints = null;
        if (!isNaN(parseInt(event.target.value))) creature.creatureProperties.hitpoints = parseInt(event.target.value);
        this.setState({creature: creature})
    };

    handleACChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.armorclass = null;
        if (!isNaN(parseInt(event.target.value))) creature.creatureProperties.armorclass = parseInt(event.target.value);
        this.setState({creature: creature})
    };

    handleAlignmentChange = (value): void => {
        const creature = this.state.creature;
        creature.creatureProperties.alignment = value.value;
        this.setState({creature: creature})
    };

    handleCreatureClassChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.creatureClass = event.target.value;
        this.setState({creature: creature})
    };

    handleAttackPropertiesNameChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.attackProperties = creature.creatureProperties.attackProperties.map((elem) => {
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
        creature.creatureProperties.attackProperties = creature.creatureProperties.attackProperties.map((elem) => {
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
        creature.creatureProperties.challenge = null;
        if (!isNaN(parseInt(event.target.value))) creature.creatureProperties.challenge = parseInt(event.target.value);
        this.setState({creature: creature})
    };

    handleMovementChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.movement = null;
        if (!isNaN(parseInt(event.target.value))) creature.creatureProperties.movement = parseInt(event.target.value);
        creature.creatureProperties.movement = parseInt(event.target.value);
        this.setState({creature: creature})
    };

    handleIniChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.ini = null;
        if (!isNaN(parseInt(event.target.value))) creature.creatureProperties.ini = parseInt(event.target.value);
        this.setState({creature: creature})
    };

    handleImageChange = ({meta, file}, status): void => {
        const creature = this.state.creature;
        creature.creatureProperties.image = file;
        this.setState({creature: creature});
        if (status == "removed") {
            creature.creatureProperties.image = null;
            this.setState({creature: creature})
        }
    };

    handleBaseAtkChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.baseAtk = null;
        creature.creatureProperties.stats.baseAttack = null;
        if (!isNaN(parseInt(event.target.value))) {
            creature.creatureProperties.baseAtk = parseInt(event.target.value);
            creature.creatureProperties.stats.baseAttack = parseInt(event.target.value);
        }
        this.setState({creature: creature})
    };

    handleXPChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.xp = null;
        if (!isNaN(parseInt(event.target.value))) creature.creatureProperties.xp = parseInt(event.target.value);
        this.setState({creature: creature})
    };

    handleSizeChange = (value): void => {
        const creature = this.state.creature;
        creature.creatureProperties.size = value.value;
        creature.creatureProperties.stats.creatureSize = value.value;
        this.setState({creature: creature})
    };

    handleStatsChange = (event, stat: "str" | "dex" | "wis" | "int" | "cha" | "con"): void => {
        const creature = this.state.creature;
        let valueAsNumber = null;
        if (!isNaN(parseInt(event.target.value))) {
            valueAsNumber = parseInt(event.target.value);
        }
        switch (stat) {
            case "str":
                creature.creatureProperties.stats.strength = valueAsNumber;
                break;
            case "cha":
                creature.creatureProperties.stats.charisma = valueAsNumber;
                break;
            case "con":
                creature.creatureProperties.stats.constitution = valueAsNumber;
                break;
            case "dex":
                creature.creatureProperties.stats.dexterity = valueAsNumber;
                break;
            case "int":
                creature.creatureProperties.stats.intelligence = valueAsNumber;
                break;
            case "wis":
                creature.creatureProperties.stats.wisdom = valueAsNumber;
                break;
            default:
                break;
        }
        this.setState({creature: creature})
    };

    handleSaveThrowsChange = (event, saveThrow: "ref" | "will" | "fort"): void => {
        const creature = this.state.creature;
        let valueAsNumber = null;
        if (!isNaN(parseInt(event.target.value))) {
            valueAsNumber = parseInt(event.target.value)
        }
        switch (saveThrow) {
            case "fort":
                creature.creatureProperties.saveThrows.fortitude = valueAsNumber;
                break;
            case "ref":
                creature.creatureProperties.saveThrows.reflex = valueAsNumber;
                break;
            case "will":
                creature.creatureProperties.saveThrows.wisdom = valueAsNumber;
                break;
            default:
                break;
        }
        this.setState({creature: creature})
    };

    handleLanguagesChange = (value, option): void => {
        const creature = this.state.creature;
        if (option.action == SelectEventTypesEnum.SELECT_OPTION || option.action == SelectEventTypesEnum.CREATE_OPTION) {
            creature.creatureProperties.languages = value.map(elem => {
                return new PathfinderLanguageViewModel(null, elem.value)
            });
        } else if (option.action == SelectEventTypesEnum.REMOVE_OPTION) {
            creature.creatureProperties.languages = creature.creatureProperties.languages.filter(elem => {
                return elem.name != option.removedValue.value
            })
        }
        this.setState({creature: creature})
    };

    handleSkillNameChange = (value, option, id): void => {
        const fields = this.state.skillFields;
        if (
            option.action === SelectEventTypesEnum.SELECT_OPTION
            || option.action === SelectEventTypesEnum.REMOVE_OPTION
        ) {
            const skillField = fields.find(skillField => {
                if (skillField.id === id) {
                    return skillField
                }
            })
            skillField.skill.name = value.value;
            skillField.skill.id = value.additionalInfoProperty;
        }
        this.setState({skillFields: fields});
        const creature = this.state.creature;
        creature.creatureProperties.skills = fields.map(field => {
            return field.skill
        });
        this.setState({creature: creature})
    };

    handleSkillLevelChange = (event, id): void => {
        const fields = this.state.skillFields;
        const skillField = fields.find(skillField => {
            if (skillField.id === id) {
                return skillField
            }
        })
        const valueAsNumber = parseInt(event.target.value);
        isNaN(valueAsNumber)? skillField.skill.level = null : skillField.skill.level = valueAsNumber;

        this.setState({skillFields: fields});
        const creature = this.state.creature;
        creature.creatureProperties.skills = fields.map(field => {
            return field.skill
        });
        this.setState({creature: creature})
    };

    handleTalentsChange = (value, option): void => {
        const creature = this.state.creature;
        if (option.action == SelectEventTypesEnum.SELECT_OPTION) {
            creature.creatureProperties.talents = this.state.talentData.filter(talent => {
                const possibleMatch = value.find(singleValue => {
                    if (
                        singleValue.value === talent.name
                        && singleValue.additionalInfoProperty === talent.type
                    ) {
                        return singleValue;
                    }
                })
                if (possibleMatch) {
                    return new PathfinderTalentViewModel(
                        talent.id,
                        talent.name,
                        talent.type,
                        talent.description,
                        talent.benefits,
                        talent.conditions,
                        talent.note
                    )
                }
            })
        } else if (option.action == SelectEventTypesEnum.REMOVE_OPTION) {
            creature.creatureProperties.talents = creature.creatureProperties.talents.filter(elem => {
                return elem.name !== option.removedValue.value
                    && elem.type !== option.removedValue.additionalInfoProperty
            })
        }
        this.setState({creature: creature})
    };

    handleActionsChange = (value, option): void => {
        const creature = this.state.creature;
        if (option.action == SelectEventTypesEnum.SELECT_OPTION) {
            creature.creatureProperties.actions = this.state.actionData.filter(action => {
                const possibleMatch = value.find(singleValue => {
                    if (
                        singleValue.value === action.name
                        && singleValue.additionalInfoProperty === action.damage
                    ) {
                        return singleValue
                    }
                })
                if (possibleMatch) {
                    return new PathfinderActionViewModel(
                        action.id,
                        action.name,
                        action.rangeType,
                        action.attackBonus,
                        action.range,
                        action.damage,
                        action.critMod,
                        action.damageTypes,
                        action.additionalInfo
                    )
                }
            })

        } else if (option.action == SelectEventTypesEnum.REMOVE_OPTION) {
            creature.creatureProperties.actions = creature.creatureProperties.actions.filter(elem => {
                return elem.name !== option.removedValue.value
                && elem.damage !== option.removedValue.additionalInfoProperty
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
                                <input type="number" value={this.state.creature.creatureProperties.hitpoints}
                                       onChange={this.handleHPChange}
                                       placeholder={"a creatures life"}
                                       className={style.creatureFormInput}
                                />
                            </label>
                            <label className={style.formTextInputArea}>
                                <strong>armorclass:</strong>
                                <input type="number" value={this.state.creature.creatureProperties.armorclass}
                                       onChange={this.handleACChange}
                                       placeholder={"A creatures armor"}
                                       className={style.creatureFormInput}
                                />
                            </label>
                            <label className={style.formSelectContainer}>
                                <strong>alignment:</strong>
                                <AlignmentSelect handleAlignmentChange={this.handleAlignmentChange}
                                                 value={this.state.creature.creatureProperties.alignment}
                                                 className={style.creatureFormSelect}
                                />
                            </label>
                            <RedFadeLine/>
                            <label className={style.formTextInputArea}>
                                <strong>creature type:</strong>
                                <input type="text" value={this.state.creature.creatureProperties.creatureClass}
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
                                {this.state.creature.creatureProperties.attackProperties &&
                                this.state.creature.creatureProperties.attackProperties.map((elem, i) => {
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
                                <input type="number" value={this.state.creature.creatureProperties.challenge}
                                       onChange={this.handleChallengeChange}
                                       placeholder={"how strong this is"}
                                       className={style.creatureFormInput}
                                />
                            </label>
                            <label className={style.formTextInputArea}>
                                <strong>movement:</strong>
                                <input type="number" value={this.state.creature.creatureProperties.movement}
                                       onChange={this.handleMovementChange}
                                       placeholder={"How far this moves"}
                                       className={style.creatureFormInput}
                                />
                            </label>
                            <label className={style.formTextInputArea}>
                                <strong>initiative modifier:</strong>
                                <input type="number"
                                       value={this.state.creature.creatureProperties.ini}
                                       onChange={this.handleIniChange}
                                       placeholder={"ini bonus to rolls"}
                                       className={style.creatureFormInput}
                                />
                            </label>
                            <label className={style.formTextInputArea}>
                                <strong>base Attack bonus:</strong>
                                <input type="number" value={this.state.creature.creatureProperties.baseAtk}
                                       onChange={this.handleBaseAtkChange}
                                       placeholder={"Bonus to attack rolls"}
                                       className={style.creatureFormInput}
                                />
                            </label>

                            <label className={style.formTextInputArea}>
                                <strong>xp:</strong>
                                <input
                                    type="number" value={this.state.creature.creatureProperties.xp}
                                    onChange={this.handleXPChange}
                                    placeholder={"the xp it yields"}
                                    className={style.creatureFormInput}
                                />
                            </label>
                            <RedFadeLine/>
                            <label className={style.formSelectContainer}>
                                <strong>size:</strong>
                                <SizeSelect handleSizeChange={this.handleSizeChange}
                                            value={{
                                                value: this.state.creature.creatureProperties.size,
                                                label: this.state.creature.creatureProperties.size
                                            }}
                                />
                            </label>
                            <label className={style.formTextInputArea} style={{height: '13%'}}>
                                <strong>stats:&nbsp;</strong>
                                <div className={style.valBlockContainer}>
                                    <label className={style.singleVal}>
                                        str:&nbsp;
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.creatureProperties.stats.strength}
                                               onChange={e => this.handleStatsChange(e, "str")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        dex:&nbsp;
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.creatureProperties.stats.dexterity}
                                               onChange={e => this.handleStatsChange(e, "dex")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        con:
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.creatureProperties.stats.constitution}
                                               onChange={e => this.handleStatsChange(e, "con")}/>
                                    </label>

                                </div>
                                <div className={style.valBlockContainer}>
                                    <label className={style.singleVal}>
                                        int:&nbsp;
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.creatureProperties.stats.intelligence}
                                               onChange={e => this.handleStatsChange(e, "int")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        wis:&nbsp;
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.creatureProperties.stats.wisdom}
                                               onChange={e => this.handleStatsChange(e, "wis")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        cha:&nbsp;
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.creatureProperties.stats.charisma}
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
                                               value={this.state.creature.creatureProperties.saveThrows.reflex}
                                               onChange={e => this.handleSaveThrowsChange(e, "ref")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        will:
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.creatureProperties.saveThrows.wisdom}
                                               onChange={e => this.handleSaveThrowsChange(e, "will")}/>
                                    </label>
                                    <label className={style.singleVal}>
                                        fort:
                                        <input className={style.subInput} type="number"
                                               value={this.state.creature.creatureProperties.saveThrows.fortitude}
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
                                    this.state.creature.creatureProperties.skills &&
                                    this.state.skillFields.map((elem, i) => {
                                        return (
                                            <label className={style.formTextInputArea}
                                                   key={i}>
                                                <p className={style.skillLabel}>name:&nbsp;</p>
                                                <CreatableSelect
                                                    options={this.state.skillData.map(elem => {
                                                        return {
                                                            value: elem.name,
                                                            label: elem.name,
                                                            additionalInfoProperty: elem.id
                                                        }
                                                    })}
                                                    value={{
                                                        value: elem.skill.name,
                                                        label: elem.skill.name,
                                                        additionalInfoProperty: elem.skill.id
                                                    }}
                                                    isClearable
                                                    key={i + "name"}
                                                    className={style.skillFormSelect}
                                                    onChange={(v, o) => this.handleSkillNameChange(v, o, elem.id)}
                                                />
                                                level:
                                                <input type="text" value={elem.skill.level}
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
                                        this.state.creature.creatureProperties.languages &&
                                        this.state.creature.creatureProperties.languages.map(elem => {
                                            return ({value: elem.name, label: elem.name})
                                        })}
                                    isClearable
                                    isMulti={true}
                                    onChange={this.handleLanguagesChange}
                                />
                            </label>
                            <label className={style.formSelectContainer}>
                                <strong>talents:</strong>
                                <Select
                                    options={this.composeSelectableAttributeOptions("Talent")}
                                    className={style.creatureFormSelect}
                                    value={
                                        this.state.creature.creatureProperties.talents &&
                                        this.state.creature.creatureProperties.talents.map(elem => {
                                            return ({
                                                value: elem.name,
                                                label: elem.name,
                                                additionalInfoProperty: elem.type
                                            })
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
                                        this.state.creature.creatureProperties.actions &&
                                        this.state.creature.creatureProperties.actions.map(elem => {
                                            return ({
                                                value: elem.name,
                                                label: `${elem.name} ${elem.damage.getFullDiceRollString()}`,
                                                additionalInfoProperty: elem.damage
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
                                hitpoints={this.state.creature.creatureProperties.hitpoints}
                                armorclass={this.state.creature.creatureProperties.armorclass}
                                alignment={this.state.creature.creatureProperties.alignment}
                                creatureClass={this.state.creature.creatureProperties.creatureClass}
                                challenge={this.state.creature.creatureProperties.challenge}
                                movement={this.state.creature.creatureProperties.movement}
                                ini={this.state.creature.creatureProperties.ini}
                                baseAtk={this.state.creature.creatureProperties.baseAtk}
                                size={this.state.creature.creatureProperties.size}
                                stats={this.state.creature.creatureProperties.stats}
                                saveThrows={this.state.creature.creatureProperties.saveThrows}
                                actions={this.state.creature.creatureProperties.actions}
                                attackProperties={this.state.creature.creatureProperties.attackProperties}
                                languages={this.state.creature.creatureProperties.languages}
                                skills={this.state.creature.creatureProperties.skills}
                                talents={this.state.creature.creatureProperties.talents}
                                xp={this.state.creature.creatureProperties.xp}
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