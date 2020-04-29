import * as React from "react";
import {ReactElement} from "react";
import {BattleCreature} from "../battleCreature/BattleCreature";
import axios, {AxiosResponse} from 'axios';
import {uuidv4} from "../../../../../service/helperFunctions";
import {selectableCreatures} from "../../../../../types/frontendTypes";
import {CreatureSelectLabel} from "../../../uiBasic/creatureSelectLabel/CreatureSelectLabel";
import {PathfinderAddSummon} from "../formAddSummon/PathfinderAddSummon";
import {BattleDiceRoller} from "../battleDiceRoller/BattleDiceRoller";
import {MultiSelectNoCreate} from "../../../uiBasic/multiSelectNoCreate/MultiSelectNoCreate";
import {CreatureViewModel} from "../../../../../model/CreatureViewModel";
import {CreatureTypeEnum} from "../../../../../model/enumeration/CreatureTypesEnum";
import {CreatureDataToViewModelMapper} from "../../../../../mapping/CreatureDataToViewModelMapper";
import {CreatureViewModelFactory} from "../../../../../factory/CreatureViewModelFactory";
import {PathfinderCreaturePropertiesViewModel} from "../../../../../model/pathfinder/PathfinderCreaturePropertiesViewModel";
import * as style from './pathfinderEncounterCreatureList.css';

export interface EncounterCreatureListProps {
    addCreatureToRound: Function;
    changeCurrentHPOfCreature: Function;
    changeCurrentACOfCreature: Function;
    changeCurrentIniOfCreature: Function;
    changeTypeOfRoundCreature: Function;
    removeCreatureFromRound: Function;
}

export interface EncounterCreatureListState {
    creaturesInBattle: CreatureViewModel<PathfinderCreaturePropertiesViewModel>[];
    creatureViewModels: CreatureViewModel<PathfinderCreaturePropertiesViewModel>[];
}

export class PathfinderEncounterCreatureList extends React.Component<EncounterCreatureListProps, EncounterCreatureListState> {
    constructor(props) {
        super(props);
        this.state = {
            creaturesInBattle: [],
            creatureViewModels: []
        }
    }
    creatureViewModelFactory = new CreatureViewModelFactory();
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
        })[0].properties.currentInitiative = parseInt(event.target.value);
        const creatureMapSorted = this.sortCreatureMap(creatureMap);
        this.setState({creaturesInBattle: creatureMapSorted}, () => this.setToSessionStorage())
    };

    setToSessionStorage = (): void => {
        sessionStorage.setItem('encounterCreatureDataMap', JSON.stringify(this.state.creaturesInBattle))
    };

    getFromSessionStorage = (): CreatureViewModel<PathfinderCreaturePropertiesViewModel>[] => {
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
        })[0].properties.currentHitpoints = parseInt(event.target.value);
        this.setState({creaturesInBattle: creatureMap}, () => this.setToSessionStorage())
    };

    handleCurrentACChange = (event, id): void => {
        const creatureMap = this.state.creaturesInBattle;
        creatureMap.filter(creature => {
            return creature.id == id
        })[0].properties.currentArmorclass = parseInt(event.target.value);
        this.setState({creaturesInBattle: creatureMap}, () => this.setToSessionStorage())
    };

    handleCurrentTypeChange = (event, id): void => {
        const creatureMap = this.state.creaturesInBattle;
        creatureMap.filter(creature => {
            return creature.id == id
        })[0].properties.type = event.target.value;
        this.setState({creaturesInBattle: creatureMap}, () => this.setToSessionStorage())
    };

    determineLabel = (creatureName: string): number => {
        const sameCreature = this.state.creaturesInBattle.filter(elem => {
            return elem.name == creatureName
        }).sort(function (cr1, cr2) {
            if (cr1.properties.label > cr2.properties.label) return 1;
            if (cr1.properties.label < cr2.properties.label) return -1;
            return 0;
        });
        if (sameCreature.length == 0) return 1;
        else return sameCreature[sameCreature.length - 1].properties.label + 1
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
            const creatureViewModels = creatureMapper.mapMultiple(creatureData.data, PathfinderCreaturePropertiesViewModel);
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
            if (entry.properties.type === CreatureTypeEnum.MONSTER) {
                selectables[0].options.push({
                    value: entry.name,
                    label: <CreatureSelectLabel image={'monster-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name} CR: ${entry.properties.challenge}`}/>
                })
            } else if (entry.properties.type === CreatureTypeEnum.PLAYER) {
                selectables[1].options.push({
                    value: entry.name,
                    label: <CreatureSelectLabel image={'player-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name}`}/>
                })
            } else if (entry.properties.type === CreatureTypeEnum.ALLY) {
                selectables[2].options.push({
                    value: entry.name,
                    label: <CreatureSelectLabel image={'ally-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name} CR: ${entry.properties.challenge}`}/>
                })
            } else if (entry.properties.type == CreatureTypeEnum.SUMMON) {
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

    cloneEntry = (
        creatureViewModel: CreatureViewModel<PathfinderCreaturePropertiesViewModel>
    ): CreatureViewModel<PathfinderCreaturePropertiesViewModel> => {
        const clonedCreatureViewModel: CreatureViewModel<PathfinderCreaturePropertiesViewModel> =
            this.creatureViewModelFactory.createFromExisting(creatureViewModel)
        clonedCreatureViewModel.properties.currentInitiative = Math.floor(Math.random() * (20 - 1) + 1) + creatureViewModel.properties.ini;
        clonedCreatureViewModel.properties.label =
            creatureViewModel.properties.label == null
            ? this.determineLabel(creatureViewModel.name) : creatureViewModel.properties.label
        return clonedCreatureViewModel;
    };

    sortCreatureMap = (
        creatureMap: Array<CreatureViewModel<PathfinderCreaturePropertiesViewModel>>
    ): Array<CreatureViewModel<PathfinderCreaturePropertiesViewModel>> => {
        return creatureMap.sort((creatureA, creatureB) => {
            if (creatureA.properties.currentInitiative < creatureB.properties.currentInitiative) return 1;
            if (creatureA.properties.currentInitiative > creatureB.properties.currentInitiative) return -1;
            return 0;
        });
    };

    addSummonedCreature = (creature: CreatureViewModel<PathfinderCreaturePropertiesViewModel>): void => {
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
        creatureMap = creatureMap.concat(this.creaturesToAdd);
        const creatureMapSorted = this.sortCreatureMap(creatureMap);
        this.creaturesToAdd.forEach(elem => {
            this.props.addCreatureToRound(elem);
        });
        this.setState({
            creaturesInBattle: creatureMapSorted
        }, () => this.setToSessionStorage());
    };

    onSelect = (selected, option): void => {
        if (option.action == 'select-option') {
            const creaturesToAdd: CreatureViewModel<PathfinderCreaturePropertiesViewModel>[] = [];
            selected.forEach(name => {
                const creature = this.state.creatureViewModels.find(elem => {
                    return elem.name == name.value
                });
                const creatureViewModel: CreatureViewModel<PathfinderCreaturePropertiesViewModel> =
                    this.creatureViewModelFactory.createFromExisting(creature);
                creatureViewModel.properties.currentInitiative =
                    Math.floor(Math.random() * (20 - 1) + 1) + creature.properties.ini
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
                    <PathfinderAddSummon addToEncounter={this.addSummonedCreature}/>
                    {this.state.creaturesInBattle.map(creature => {
                        return (
                            <BattleCreature
                                key={uuidv4()}
                                id={creature.id}
                                name={creature.name}
                                type={creature.properties.type}
                                hitpoints={creature.properties.hitpoints}
                                label={creature.properties.label}
                                attackProperties={creature.properties.attackProperties}
                                xp={creature.properties.xp}
                                armorclass={creature.properties.armorclass}
                                alignment={creature.properties.alignment}
                                creatureClass={creature.properties.creatureClass}
                                challenge={creature.properties.challenge}
                                movement={creature.properties.movement}
                                image={creature.properties.image}
                                ini={creature.properties.ini}
                                currentIni={creature.properties.currentInitiative}
                                currentHP={creature.properties.currentHitpoints}
                                currentAC={creature.properties.currentArmorclass}
                                baseAtk={creature.properties.baseAtk}
                                size={creature.properties.size}
                                stats={creature.properties.stats}
                                sortByIni={this.sortByIni}
                                handleCurrentACChange={this.handleCurrentACChange}
                                handleCurrentHPChange={this.handleCurrentHPChange}
                                handleCurrentTypeChange={this.handleCurrentTypeChange}
                                handleRemoveFromEncounter={this.handleRemoveFromEncounter}
                                saveThrows={creature.properties.saveThrows}
                                skills={creature.properties.skills}
                                talents={creature.properties.talents}
                                actions={creature.properties.actions}
                                languages={creature.properties.languages}
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
