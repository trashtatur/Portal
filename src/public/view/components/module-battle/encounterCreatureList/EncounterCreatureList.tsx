import * as React from "react";
import {ReactElement} from "react";
import {BattleCreature} from "../battleCreature/BattleCreature";
import axios, {AxiosResponse} from 'axios';
import {uuidv4} from "../../../../service/helperFunctions";
import {selectableCreatures} from "../../../../frontendTypes";
import {CreatureSelectLabel} from "../../uiBasic/creatureSelectLabel/CreatureSelectLabel";
import {AddSummon} from "../formAddSummon/AddSummon";
import {BattleDiceRoller} from "../battleDiceRoller/BattleDiceRoller";
import {MultiSelectNoCreate} from "../../uiBasic/multiSelectNoCreate/MultiSelectNoCreate";
import {CreatureViewModel} from "../../../../model/CreatureViewModel";
import {CreatureTypeEnum} from "../../../../model/enumeration/CreatureTypesEnum";
import {CreatureDataToViewModelMapper} from "../../../../mapping/CreatureDataToViewModelMapper";
import {CreatureViewModelFactory} from "../../../../factory/CreatureViewModelFactory";
import * as style from './encounterCreatureList.css';

export interface EncounterCreatureListProps {
    addCreatureToRound: Function;
    changeCurrentHPOfCreature: Function;
    changeCurrentACOfCreature: Function;
    changeCurrentIniOfCreature: Function;
    changeTypeOfRoundCreature: Function;
    removeCreatureFromRound: Function;
}

export interface EncounterCreatureListState {
    creaturesInBattle: CreatureViewModel[];
    creatureViewModels: CreatureViewModel[];
}

export class EncounterCreatureList extends React.Component<EncounterCreatureListProps, EncounterCreatureListState> {
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
        })[0].currentInitiative = parseInt(event.target.value);
        const creatureMapSorted = this.sortCreatureMap(creatureMap);
        this.setState({creaturesInBattle: creatureMapSorted}, () => this.setToSessionStorage())
    };

    setToSessionStorage = (): void => {
        sessionStorage.setItem('encounterCreatureDataMap', JSON.stringify(this.state.creaturesInBattle))
    };

    getFromSessionStorage = (): CreatureViewModel[] => {
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
        })[0].currentHitpoints = parseInt(event.target.value);
        this.setState({creaturesInBattle: creatureMap}, () => this.setToSessionStorage())
    };

    handleCurrentACChange = (event, id): void => {
        const creatureMap = this.state.creaturesInBattle;
        creatureMap.filter(creature => {
            return creature.id == id
        })[0].currentArmorclass = parseInt(event.target.value);
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

    componentDidMount = async (): Promise<void> => {
        const potentialEncounter = this.getFromSessionStorage();
        if (potentialEncounter) {
            //TODO make this work with view Models
            //this.setState({creaturesInBattle: potentialEncounter});
        }
        try {
            const creatureMapper = new CreatureDataToViewModelMapper();
            const creatureData = await this.getAllCreatures();
            const creatureViewModels = creatureMapper.mapMultiple(creatureData.data);
            this.setState({creatureViewModels: creatureViewModels})
        } catch (e) {
            console.log(e)
        }
    };

    getAllCreatures = async (): Promise<AxiosResponse> => {
        return await axios.get(
            '/V1/creature/pathfinder'
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
     * @param creatureViewModel
     */
    cloneEntry = (creatureViewModel: CreatureViewModel): CreatureViewModel => {
        const clonedCreatureViewModel = CreatureViewModelFactory.createFromExisting(creatureViewModel)
        clonedCreatureViewModel.currentInitiative = Math.floor(Math.random() * (20 - 1) + 1) + creatureViewModel.ini;
        clonedCreatureViewModel.label =
            creatureViewModel.label == null
            ? this.determineLabel(creatureViewModel.name) : creatureViewModel.label
        return clonedCreatureViewModel;
    };

    sortCreatureMap = (creatureMap: Array<CreatureViewModel>): Array<CreatureViewModel> => {
        return creatureMap.sort((creatureA, creatureB) => {
            if (creatureA.currentInitiative < creatureB.currentInitiative) return 1;
            if (creatureA.currentInitiative > creatureB.currentInitiative) return -1;
            return 0;
        });
    };

    addSummonedCreature = (creature: CreatureViewModel): void => {
        const summon = this.cloneEntry(creature);
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
            const creaturesToAdd: CreatureViewModel[] = [];
            selected.forEach(name => {
                const creature = this.state.creatureViewModels.find(elem => {
                    return elem.name == name.value
                });
                const creatureViewModel = CreatureViewModelFactory.createFromExisting(creature);
                creatureViewModel.currentInitiative = Math.floor(Math.random() * (20 - 1) + 1) + creature.ini
                creaturesToAdd.push(creatureViewModel)
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
                                key={uuidv4()}
                                id={creature.id}
                                name={creature.name}
                                type={creature.type}
                                hitpoints={creature.hitpoints}
                                label={creature.label}
                                attackProperties={creature.attackProperties}
                                xp={creature.xp}
                                armorclass={creature.armorclass}
                                alignment={creature.alignment}
                                creatureClass={creature.creatureClass}
                                challenge={creature.challenge}
                                movement={creature.movement}
                                image={creature.image}
                                ini={creature.ini}
                                currentIni={creature.currentInitiative}
                                currentHP={creature.currentHitpoints}
                                currentAC={creature.currentArmorclass}
                                baseAtk={creature.baseAtk}
                                size={creature.size}
                                stats={creature.stats}
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
