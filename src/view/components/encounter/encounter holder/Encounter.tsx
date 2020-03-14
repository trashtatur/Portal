import * as React from "react";
import {ReactElement} from "react";
import {Creature} from "../creature/Creature";
import {CreatureSelect} from "../creatureSelect/CreatureSelect";
import axios, {AxiosResponse} from 'axios';
import {uuidv4} from "../../helper/helperFunctions";
import {creature, selectableCreatures} from "../../componentTypes";
import {CreatureSelectLabel} from "../../creatureSelectLabel/CreatureSelectLabel";
import * as style from './encounter.css';


export interface EncounterProps {
    addCreatureToRound: Function;
    changeCurrentHPOfCreature: Function;
    changeCurrentACOfCreature: Function;
    changeCurrentIniOfCreature: Function;
    changeTypeOfRoundCreature: Function;
    removeCreatureFromRound: Function;
}

export interface EncounterState {
    creatureMap: creature[];
    creatureDataMap;
}

export class Encounter extends React.Component<EncounterProps, EncounterState> {
    constructor(props) {
        super(props);
        this.sortByIni = this.sortByIni.bind(this);
        this.addCreatures = this.addCreatures.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.handleCurrentACChange = this.handleCurrentACChange.bind(this);
        this.handleCurrentHPChange = this.handleCurrentHPChange.bind(this);
        this.handleCurrentTypeChange = this.handleCurrentTypeChange.bind(this);
        this.handleRemoveFromEncounter = this.handleRemoveFromEncounter.bind(this);
        this.state = {
            creatureMap: [],
            creatureDataMap: []
        }
    }

    creaturesToAdd = [];
    creatureSelect = null;

    /**
     * Sorts creature list by initiative
     * @param event
     * @param id
     */
    sortByIni(event, id): void {
        const creatureMap = this.state.creatureMap;
        creatureMap.filter(creature => {
            return creature.id == id
        })[0].currentIni = parseInt(event.target.value);
        const creatureMapSorted = creatureMap.sort((creatureA, creatureB) => {
            if (creatureA.currentIni < creatureB.currentIni) return 1;
            if (creatureA.currentIni > creatureB.currentIni) return -1;
            return 0;
        });
        this.setState({creatureMap: creatureMapSorted}, ()=> this.setToSessionStorage())
    }

    setToSessionStorage = (): void => {
        sessionStorage.setItem('encounterCreatureDataMap',JSON.stringify(this.state.creatureMap))
    };

    getFromSessionStorage = (): creature[] => {
        const stringCreatureData = sessionStorage.getItem('encounterCreatureDataMap');
        return JSON.parse(stringCreatureData);
    };

    handleRemoveFromEncounter(id: string): void {
        this.setState({
            creatureMap:
                this.state.creatureMap.filter(elem => {
                    return elem.id != id;
                })
        }, ()=> this.setToSessionStorage())
    }

    handleCurrentHPChange(event, id): void {
        const creatureMap = this.state.creatureMap;
        creatureMap.filter(creature => {
            return creature.id == id
        })[0].currentHP = parseInt(event.target.value);
        this.setState({creatureMap: creatureMap}, () => this.setToSessionStorage())
    }

    handleCurrentACChange(event, id): void {
        const creatureMap = this.state.creatureMap;
        creatureMap.filter(creature => {
            return creature.id == id
        })[0].currentAC = parseInt(event.target.value);
        this.setState({creatureMap: creatureMap},()=> this.setToSessionStorage())
    }

    handleCurrentTypeChange(event, id): void {
        const creatureMap = this.state.creatureMap;
        creatureMap.filter(creature => {
            return creature.id == id
        })[0].type = event.target.value;
        this.setState({creatureMap: creatureMap},()=> this.setToSessionStorage())
    }

    determineLabel(creatureName: string): number {
        const sameCreature = this.state.creatureMap.filter(elem => {
            return elem.name == creatureName
        }).sort(function (cr1, cr2) {
            if (cr1.label > cr2.label) return 1;
            if (cr1.label < cr2.label) return -1;
            return 0;
        });
        if (sameCreature.length == 0) return 0;
        else return sameCreature[sameCreature.length - 1].label + 1
    }

    componentDidMount(): void {
        const potentialEncounter = this.getFromSessionStorage();
        if (potentialEncounter) {
            this.setState({creatureMap: potentialEncounter});
        }
        this.getAllCreatures().then(result => {
            this.setState({creatureDataMap: result.data})
        });
    }

    async getAllCreatures(): Promise<AxiosResponse> {
        return await axios.get(
            '/V1/creature'
        );
    }

    /**
     * Composes dropdown to select creatures
     */
    composeSelectableOptions(): selectableCreatures[] {
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

        this.state.creatureDataMap.forEach(entry => {
            if (entry.type == "monster") {
                selectables[0].options.push({value: entry.name,
                    label: <CreatureSelectLabel image={'monster-icon.png'}
                                                id={entry.uuid}
                                                labelText={`${entry.name} CR: ${entry.challenge}`}/>
                })
            } else if (entry.type == "player") {
                selectables[1].options.push({value: entry.name,
                    label: <CreatureSelectLabel image={'player-icon.png'}
                                                id={entry.uuid}
                                                labelText={`${entry.name}`}/>
                })
            } else if (entry.type == "ally") {
                selectables[2].options.push({value: entry.name,
                    label: <CreatureSelectLabel image={'ally-icon.png'}
                                                id={entry.uuid}
                                                labelText={`${entry.name} CR: ${entry.challenge}`}/>
                })
            } else if (entry.type == "summon") {
                selectables[3].options.push({value: entry.name,
                    label: <CreatureSelectLabel image={'summon-icon.png'}
                                                id={entry.uuid}
                                                labelText={`${entry.name} CR: ${entry.challenge}`}/>
                })
            }
        });
        return selectables
    }

    /**
     * Clones creature entry in to add list
     * so that each component is unique
     * @param elem
     */
    cloneEntry(elem: creature): creature {
        return {
            ...elem,
            id: uuidv4(),
            label: elem.label == null ? this.determineLabel(elem.name) : elem.label,
            currentIni: Math.floor(Math.random() * (+20 - +1) + +1) + elem.ini
        };
    }

    /**
     * Adds selected creatures
     */
    addCreatures(): void {
        const toAdd = this.creaturesToAdd.map(elem => {
            return this.cloneEntry(elem)
        });
        let creatureMap = this.state.creatureMap;
        creatureMap = creatureMap.concat(toAdd);
        const creatureMapSorted = creatureMap.sort((creatureA, creatureB) => {
            if (creatureA.currentIni < creatureB.currentIni) return 1;
            if (creatureA.currentIni > creatureB.currentIni) return -1;
            return 0;
        });
        toAdd.forEach(elem => {
            this.props.addCreatureToRound(elem);
        });
        this.setState({
            creatureMap: creatureMapSorted
        },() => this.setToSessionStorage());
    }


    /**
     * Reacts to select or remove event.
     * and then preps the selected creatures for creation
     * @param selected
     * @param option
     */
    onSelect(selected, option): void {
        if (option.action == 'select-option') {
            const creaturesToAdd: creature[] = [];
            let filtered = [];
            selected.forEach(name => {
                filtered = this.state.creatureDataMap.filter(elem => {
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
                        currentIni: Math.floor(Math.random() * (+20 - +1) + +1) + filtered[0].ini,
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
                            return elem.name
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
    }


    render(): ReactElement {
        return (
            <div className={style.encounterCreatureDialogContainer}>
                <div className={style.addDialog}>
                    <CreatureSelect
                        selectableOptions={this.composeSelectableOptions()}
                        onSelect={this.onSelect}
                        ref={ref => {
                            this.creatureSelect = ref
                        }}
                    />
                    <button className={style.creatureAddButton} type="button" onClick={this.addCreatures}>Add Creature
                    </button>
                </div>
                {this.state.creatureMap.map(creature => {
                    return (
                        <Creature
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
        )
    }
}
