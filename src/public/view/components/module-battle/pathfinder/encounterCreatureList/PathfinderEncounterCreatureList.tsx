import * as React from "react";
import {ReactElement} from "react";
import {BattleCreature} from "../battleCreature/BattleCreature";
import axios, {AxiosResponse} from 'axios';
import {uuidv4} from "@/public/service/helperFunctions";
import {selectable, selectableCreatures} from "@/public/types/frontendTypes";
import {CreatureSelectLabel} from "@/public/view/components/uiBasic/creatureSelectLabel/CreatureSelectLabel";
import {PathfinderAddSummon} from "@/public/view/components/module-battle/pathfinder/formAddSummon/PathfinderAddSummon";
import {BattleDiceRoller} from "../battleDiceRoller/BattleDiceRoller";
import {MultiSelectNoCreate} from "@/public/view/components/uiBasic/multiSelectNoCreate/MultiSelectNoCreate";
import {CreatureViewModel} from "@/public/model/CreatureViewModel";
import {TypeEnum} from "@/public/model/enumeration/TypesEnum";
import {CreatureDataToViewModelMapper} from "@/public/mapping/CreatureDataToViewModelMapper";
import {CreatureViewModelFactory} from "@/public/factory/CreatureViewModelFactory";
import {PathfinderCreaturePropertiesViewModel} from "@/public/model/pathfinder/PathfinderCreaturePropertiesViewModel";
import {SelectEventTypesEnum} from "@/public/model/enumeration/SelectEventTypesEnum";
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
    creaturesToAdd: CreatureViewModel<PathfinderCreaturePropertiesViewModel>[];
    creaturesInBattle: CreatureViewModel<PathfinderCreaturePropertiesViewModel>[];
    creatureViewModels: CreatureViewModel<PathfinderCreaturePropertiesViewModel>[];
}

export class PathfinderEncounterCreatureList extends React.Component<EncounterCreatureListProps, EncounterCreatureListState> {
    constructor(props) {
        super(props);
        this.state = {
            creaturesToAdd: [],
            creaturesInBattle: [],
            creatureViewModels: []
        }
    }
    creatureViewModelFactory = new CreatureViewModelFactory();

    sortByIni = (event, id, label): void => {
        const creatureMap = this.state.creaturesInBattle;
        creatureMap.filter(creature => {
            return creature.id == id && creature.properties.label === label;
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

    handleRemoveFromEncounter = (id: string, label: number): void => {
        this.setState({
            creaturesInBattle:
                this.state.creaturesInBattle.filter(elem => {
                    return elem.id !==  id && elem.properties.label !== label;
                })
        }, () => this.setToSessionStorage())
    };

    handleCurrentHPChange = (event, id, label): void => {
        const creatureMap = this.state.creaturesInBattle;
        creatureMap.filter(creature => {
            return creature.id == id && creature.properties.label === label;
        })[0].properties.currentHitpoints = parseInt(event.target.value);
        this.setState({creaturesInBattle: creatureMap}, () => this.setToSessionStorage())
    };

    handleCurrentACChange = (event, id, label): void => {
        const creatureMap = this.state.creaturesInBattle;
        creatureMap.filter(creature => {
            return creature.id == id && creature.properties.label === label;
        })[0].properties.currentArmorclass = parseInt(event.target.value);
        this.setState({creaturesInBattle: creatureMap}, () => this.setToSessionStorage())
    };

    handleCurrentTypeChange = (event, id, label): void => {
        const creatureMap = this.state.creaturesInBattle;
        creatureMap.filter(creature => {
            return creature.id == id && creature.properties.label === label;
        })[0].properties.type = event.target.value;
        this.setState({creaturesInBattle: creatureMap}, () => this.setToSessionStorage())
    };

    determineLabel = (creatureViewModel: CreatureViewModel<PathfinderCreaturePropertiesViewModel>): number => {
        const sameCreature = this.state.creaturesInBattle.filter(elem => {
            return elem.name == creatureViewModel.name
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
            if (entry.properties.type === TypeEnum.MONSTER) {
                selectables[0].options.push({
                    value: entry.name,
                    label: <CreatureSelectLabel image={'monster-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name} CR: ${entry.properties.challenge}`}/>
                })
            } else if (entry.properties.type === TypeEnum.PLAYER) {
                selectables[1].options.push({
                    value: entry.name,
                    label: <CreatureSelectLabel image={'player-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name}`}/>
                })
            } else if (entry.properties.type === TypeEnum.ALLY) {
                selectables[2].options.push({
                    value: entry.name,
                    label: <CreatureSelectLabel image={'ally-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name} CR: ${entry.properties.challenge}`}/>
                })
            } else if (entry.properties.type == TypeEnum.SUMMON) {
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

    formatValues = (): selectable[] => {
        return this.state.creaturesToAdd.map(creature => {
            return {
                value: creature.name,
                label: <CreatureSelectLabel image={`${creature.properties.type}-icon.png`}
                                            creature={creature}
                                            labelText={`${creature.name}`}/>
            }
        })
    }

    cloneCreatureViewModel = (
        creatureViewModel: CreatureViewModel<PathfinderCreaturePropertiesViewModel>
    ): CreatureViewModel<PathfinderCreaturePropertiesViewModel> => {
        const clonedCreatureViewModel: CreatureViewModel<PathfinderCreaturePropertiesViewModel> =
            this.creatureViewModelFactory.createFromExisting(creatureViewModel)
        clonedCreatureViewModel.properties.label =
            clonedCreatureViewModel.properties.label == null
            ? this.determineLabel(clonedCreatureViewModel) : clonedCreatureViewModel.properties.label
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
        const summon = this.cloneCreatureViewModel(creature);
        const creatureMap = this.state.creaturesInBattle;
        creatureMap.push(summon);
        this.props.addCreatureToRound(summon);
        this.setState(
            {creaturesInBattle: this.sortCreatureMap(creatureMap)}, () => this.setToSessionStorage()
        )
    };

    addCreatures = (): void => {
        let creatureMap = this.state.creaturesInBattle;

        const toAdd = this.state.creaturesToAdd.map(creatureToAdd => {
            return this.cloneCreatureViewModel(creatureToAdd)
        })

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
        if (option.action == SelectEventTypesEnum.SELECT_OPTION) {
            const creaturesToAdd: CreatureViewModel<PathfinderCreaturePropertiesViewModel>[] = [];
            selected.forEach(name => {
                const creature = this.state.creatureViewModels.find(elem => {
                    return elem.name == name.value
                });
                creaturesToAdd.push(creature)
            });
            this.setState({creaturesToAdd: creaturesToAdd})
        }
        if (option.action == SelectEventTypesEnum.REMOVE_OPTION) {
            const creaturesToAdd = this.state.creaturesToAdd.filter(elem => {
                return elem.name != option.removedValue.value
            })
            this.setState({creaturesToAdd: creaturesToAdd})
        }
        if (option.action == 'clear') {
            this.setState(({creaturesToAdd: []}))
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
                            value={this.formatValues()}
                            handleSelectChange={this.onSelect}
                            className={style.creatureSelect}
                        />
                        <button className={style.creatureAddButton} type="button" onClick={() => this.addCreatures()}>Add
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
