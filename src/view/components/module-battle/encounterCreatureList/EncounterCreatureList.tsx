import * as React from "react";
import {ReactElement} from "react";
import {BattleCreature} from "../battleCreature/BattleCreature";
import axios, {AxiosResponse} from 'axios';
import {uuidv4} from "../../../service/helperFunctions";
import {creature, selectableCreatures} from "../../componentTypes";
import {CreatureSelectLabel} from "../../uiBasic/creatureSelectLabel/CreatureSelectLabel";
import {AddSummon} from "../formAddSummon/AddSummon";
import {BattleDiceRoller} from "../battleDiceRoller/BattleDiceRoller";
import {MultiSelectNoCreate} from "../../uiBasic/multiSelectNoCreate/MultiSelectNoCreate";
import {CreatureViewModel} from "../../../model/CreatureViewModel";
import {CreatureTypeEnum} from "../../../model/enumeration/CreatureTypesEnum";
import * as style from './encounterCreatureList.css';


export interface EncounterProps {
    addCreatureToRound: Function;
    changeCurrentHPOfCreature: Function;
    changeCurrentACOfCreature: Function;
    changeCurrentIniOfCreature: Function;
    changeTypeOfRoundCreature: Function;
    removeCreatureFromRound: Function;
}

export interface EncounterState {
    creaturesInBattle: creature[];
    creatureViewModels: CreatureViewModel[];
}

export class EncounterCreatureList extends React.Component<EncounterProps, EncounterState> {
    constructor(props) {
        super(props);
        this.state = {
            creaturesInBattle: [],
            creatureViewModels: []
        }
    }

    creaturesToAdd = [];

    /**
     * Sorts creature list by initiative
     * @param event
     * @param id
     */
    sortByIni = (event, id): void => {
        const creatureMap = this.state.creaturesInBattle;
        creatureMap.filter(creature => {
            return creature.id == id
        })[0].currentIni = parseInt(event.target.value);
        const creatureMapSorted = this.sortCreatureMap(creatureMap);
        this.setState({creaturesInBattle: creatureMapSorted}, () => this.setToSessionStorage())
    };

    setToSessionStorage = (): void => {
        sessionStorage.setItem('encounterCreatureDataMap', JSON.stringify(this.state.creaturesInBattle))
    };

    getFromSessionStorage = (): creature[] => {
        const stringCreatureData = sessionStorage.getItem('encounterCreatureDataMap');
        return JSON.parse(stringCreatureData);
    };

    handleRemoveFromEncounter = (id: string): void => {
        this.setState({
            creaturesInBattle:
                this.state.creaturesInBattle.filter(elem => {
                    return elem.id != id;
                })
        }, () => this.setToSessionStorage())
    };

    handleCurrentHPChange = (event, id): void => {
        const creatureMap = this.state.creaturesInBattle;
        creatureMap.filter(creature => {
            return creature.id == id
        })[0].currentHP = parseInt(event.target.value);
        this.setState({creaturesInBattle: creatureMap}, () => this.setToSessionStorage())
    };

    handleCurrentACChange = (event, id): void => {
        const creatureMap = this.state.creaturesInBattle;
        creatureMap.filter(creature => {
            return creature.id == id
        })[0].currentAC = parseInt(event.target.value);
        this.setState({creaturesInBattle: creatureMap}, () => this.setToSessionStorage())
    };

    handleCurrentTypeChange = (event, id): void => {
        const creatureMap = this.state.creaturesInBattle;
        creatureMap.filter(creature => {
            return creature.id == id
        })[0].type = event.target.value;
        this.setState({creaturesInBattle: creatureMap}, () => this.setToSessionStorage())
    };

    determineLabel = (creatureName: string): number => {
        const sameCreature = this.state.creaturesInBattle.filter(elem => {
            return elem.name == creatureName
        }).sort(function (cr1, cr2) {
            if (cr1.label > cr2.label) return 1;
            if (cr1.label < cr2.label) return -1;
            return 0;
        });
        if (sameCreature.length == 0) return 1;
        else return sameCreature[sameCreature.length - 1].label + 1
    };

    componentDidMount = (): void => {
        const potentialEncounter = this.getFromSessionStorage();
        if (potentialEncounter) {
            this.setState({creaturesInBattle: potentialEncounter});
        }
        this.getAllCreatures().then(result => {
            this.setState({creatureViewModels: result.data})
        });
    };

    getAllCreatures = async (): Promise<AxiosResponse> => {
        return await axios.get(
            '/V1/creature'
        );
    };

    composeSelectableOptions = (): selectableCreatures[] => {
        const selectables: selectableCreatures[] = [
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
            },
            {
                label: "summons",
                options: []
            }
        ];

        this.state.creatureViewModels.forEach(entry => {
            if (entry.type === CreatureTypeEnum.MONSTER) {
                selectables[0].options.push({
                    value: entry.name,
                    label: <CreatureSelectLabel image={'monster-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name} CR: ${entry.challenge}`}/>
                })
            } else if (entry.type === CreatureTypeEnum.PLAYER) {
                selectables[1].options.push({
                    value: entry.name,
                    label: <CreatureSelectLabel image={'player-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name}`}/>
                })
            } else if (entry.type === CreatureTypeEnum.ALLY) {
                selectables[2].options.push({
                    value: entry.name,
                    label: <CreatureSelectLabel image={'ally-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name} CR: ${entry.challenge}`}/>
                })
            } else if (entry.type == CreatureTypeEnum.SUMMON) {
                selectables[3].options.push({
                    value: entry.name,
                    label: <CreatureSelectLabel image={'summon-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name}`}/>
                })
            }
        });
        return selectables
    };

    /**
     * Clones creature entry in to add list
     * so that each component is unique
     * @param elem
     */
    cloneEntry = (elem: creature): creature => {
        return {
            ...elem,
            id: uuidv4(),
            label: elem.label == null ? this.determineLabel(elem.name) : elem.label,
            currentIni: Math.floor(Math.random() * (20 - 1) + 1) + elem.ini
        };
    };

    sortCreatureMap = (creatureMap: Array<creature>): Array<creature> => {
        return creatureMap.sort((creatureA, creatureB) => {
            if (creatureA.currentIni < creatureB.currentIni) return 1;
            if (creatureA.currentIni > creatureB.currentIni) return -1;
            return 0;
        });
    };

    addSummonedCreature = (creature: creature): void => {
        creature.ini = parseInt(creature.ini);
        const summon = this.cloneEntry(creature);
        summon.handleCurrentACChange = this.handleCurrentACChange;
        summon.handleCurrentHPChange = this.handleCurrentHPChange;
        summon.handleCurrentTypeChange = this.handleCurrentTypeChange;
        summon.currentAC = summon.armorclass;
        summon.currentHP = summon.hitpoints;

        const creatureMap = this.state.creaturesInBattle;
        creatureMap.push(summon);
        this.props.addCreatureToRound(summon);
        this.setState(
            {creaturesInBattle: this.sortCreatureMap(creatureMap)}, () => this.setToSessionStorage()
        )
    };

    addCreatures = (): void => {
        const toAdd = this.creaturesToAdd.map(elem => {
            return this.cloneEntry(elem)
        });
        let creatureMap = this.state.creaturesInBattle;
        creatureMap = creatureMap.concat(toAdd);
        const creatureMapSorted = this.sortCreatureMap(creatureMap);
        toAdd.forEach(elem => {
            this.props.addCreatureToRound(elem);
        });
        this.setState({
            creaturesInBattle: creatureMapSorted
        }, () => this.setToSessionStorage());
    };

    onSelect = (selected, option): void => {
        if (option.action == 'select-option') {
            const creaturesToAdd: creature[] = [];
            let filtered = [];
            selected.forEach(name => {
                filtered = this.state.creatureViewModels.filter(elem => {
                    return elem.name == name.value
                });
                creaturesToAdd.push(
                    {
                        id: "",
                        name: filtered[0].name,
                        type: filtered[0].type,
                        hitpoints: filtered[0].hitpoints,
                        armorclass: filtered[0].armorclass,
                        label: null,
                        alignment: filtered[0].alignment,
                        attackProperties:
                            filtered[0].attackProperties == null ? null : filtered[0].attackProperties,
                        creatureClass: filtered[0].creatureClass,
                        challenge: filtered[0].challenge,
                        movement: filtered[0].movement,
                        image: filtered[0].image,
                        ini: filtered[0].ini,
                        currentIni: Math.floor(Math.random() * (20 - 1) + 1) + filtered[0].ini,
                        currentAC: filtered[0].armorclass,
                        currentHP: filtered[0].hitpoints,
                        baseAtk: filtered[0].baseAtk,
                        xp: filtered[0].xp || 0,
                        kmb: filtered[0].kmb || 0,
                        kmv: filtered[0].kmv || 0,
                        sortByIni: this.sortByIni,
                        handleCurrentACChange: this.handleCurrentACChange,
                        handleCurrentHPChange: this.handleCurrentHPChange,
                        handleCurrentTypeChange: this.handleCurrentTypeChange,
                        skills: filtered[0].skills == [] ? [] : filtered[0].skills.map(elem => {
                            const level = elem.CreatureSkill.skillLevel;
                            return `${elem.name} ${level}`
                        }),
                        size: filtered[0].size,
                        stats: JSON.parse(filtered[0].stats) || {},
                        saveThrows: JSON.parse(filtered[0].saveThrows) || {},
                        languages: filtered[0].languages == [] ? [] : filtered[0].languages.map(elem => {
                            return elem.name
                        }),
                        talents: filtered[0].talents == [] ? [] : filtered[0].talents.map(elem => {
                            return {
                                name: elem.name,
                                type: elem.type,
                                benefits: elem.benefits,
                                conditions: elem.conditions
                            }
                        }),
                        actions: filtered[0].actions == [] ? [] : filtered[0].actions.map(elem => {
                            return {
                                name: elem.name,
                                rangeType: elem.rangeType,
                                range: elem.range,
                                attackBonus: elem.attackBonus,
                                damage: elem.damage,
                                critmod: elem.critMod,
                                damageType: elem.damageType,
                                additionalInfo: elem.additionalInfo
                            }
                        })
                    }
                )
            });
            this.creaturesToAdd = creaturesToAdd;
        }
        if (option.action == 'remove-value') {
            this.creaturesToAdd = this.creaturesToAdd.filter(elem => {
                return elem.name != option.removedValue.value
            })
        }
        if (option.action == 'clear') {
            this.creaturesToAdd = [];
        }
    };


    render(): ReactElement {
        return (
            <>
                <BattleDiceRoller
                    allCreatures={this.state.creaturesInBattle}
                    changeCurrentACOfCreature={this.props.changeCurrentACOfCreature}
                    changeCurrentHPOfCreature={this.props.changeCurrentHPOfCreature}
                    changeCurrentIniOfCreature={this.props.changeCurrentIniOfCreature}
                />
                <div className={style.encounterCreatureDialogContainer}>
                    <div className={style.addDialog}>
                        <MultiSelectNoCreate
                            selectables={this.composeSelectableOptions()}
                            handleSelectChange={this.onSelect}
                            className={style.creatureSelect}
                        />
                        <button className={style.creatureAddButton} type="button" onClick={this.addCreatures}>Add
                        </button>
                    </div>
                    <AddSummon addToEncounter={this.addSummonedCreature}/>
                    {this.state.creaturesInBattle.map(creature => {
                        return (
                            <BattleCreature
                                id={creature.id}
                                name={creature.name}
                                type={creature.type}
                                hitpoints={creature.hitpoints}
                                label={creature.label}
                                attackProperties={creature.attackProperties}
                                key={uuidv4()}
                                xp={creature.xp}
                                armorclass={creature.armorclass}
                                alignment={creature.alignment}
                                creatureClass={creature.creatureClass}
                                challenge={creature.challenge}
                                movement={creature.movement}
                                image={creature.image}
                                ini={creature.ini}
                                currentIni={creature.currentIni}
                                currentHP={creature.currentHP}
                                currentAC={creature.currentAC}
                                baseAtk={creature.baseAtk}
                                size={creature.size}
                                stats={creature.stats}
                                kmb={creature.kmb}
                                kmv={creature.kmv}
                                sortByIni={this.sortByIni}
                                handleCurrentACChange={this.handleCurrentACChange}
                                handleCurrentHPChange={this.handleCurrentHPChange}
                                handleCurrentTypeChange={this.handleCurrentTypeChange}
                                handleRemoveFromEncounter={this.handleRemoveFromEncounter}
                                saveThrows={creature.saveThrows}
                                skills={creature.skills}
                                talents={creature.talents}
                                actions={creature.actions}
                                languages={creature.languages}
                                changeTypeOfRoundCreature={this.props.changeTypeOfRoundCreature}
                                changeCurrentACOfRoundCreature={this.props.changeCurrentACOfCreature}
                                changeCurrentHPOfRoundCreature={this.props.changeCurrentHPOfCreature}
                                changeCurrentIniOfRoundCreature={this.props.changeCurrentIniOfCreature}
                                removeCreatureFromRound={this.props.removeCreatureFromRound}
                            />
                        )
                    })}
                </div>
            </>
        )
    }
}
