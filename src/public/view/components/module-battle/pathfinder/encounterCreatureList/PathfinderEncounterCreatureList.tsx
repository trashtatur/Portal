import * as React from "react";
import {ReactElement} from "react";
import {BattleCreature} from "../battleCreature/BattleCreature";
import axios, {AxiosResponse} from 'axios';
import {selectable, selectableCreatures} from "@/public/types/frontendTypes";
import {CreatureSelectLabel} from "@/public/view/components/uiBasic/creatureSelectLabel/CreatureSelectLabel";
import {PathfinderAddSummon} from "@/public/view/components/module-battle/pathfinder/formAddSummon/PathfinderAddSummon";
import {BattleDiceRoller} from "../battleDiceRoller/BattleDiceRoller";
import {MultiSelectNoCreate} from "@/public/view/components/uiBasic/multiSelectNoCreate/MultiSelectNoCreate";
import {CreatureViewModel} from "@/public/model/CreatureViewModel";
import {TypeEnum} from "@/public/model/enumeration/TypesEnum";
import {CreatureViewModelFactory} from "@/public/factory/CreatureViewModelFactory";
import {PathfinderCreaturePropertiesViewModel} from "@/public/model/pathfinder/PathfinderCreaturePropertiesViewModel";
import {SelectEventTypesEnum} from "@/public/model/enumeration/SelectEventTypesEnum";
import {CreatureSerializerService} from "@/public/service/CreatureSerializerService";
import {uuidv4} from "@/public/service/UuidService";
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
            return creature.id == id && creature.creatureProperties.label === label;
        })[0].creatureProperties.currentInitiative = parseInt(event.target.value);
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
                    if (elem.creatureProperties.id === id) {
                        if (elem.creatureProperties.label === label) {
                            return false;
                        }
                    }
                    return true;
                })
        }, () => this.setToSessionStorage())
    };

    handleCurrentHPChange = (event, id, label): void => {
        const creatureMap = this.state.creaturesInBattle;
        creatureMap.filter(creature => {
            return creature.id == id && creature.creatureProperties.label === label;
        })[0].creatureProperties.currentHitpoints = parseInt(event.target.value);
        this.setState({creaturesInBattle: creatureMap}, () => this.setToSessionStorage())
    };

    handleCurrentACChange = (event, id, label): void => {
        const creatureMap = this.state.creaturesInBattle;
        creatureMap.filter(creature => {
            return creature.id == id && creature.creatureProperties.label === label;
        })[0].creatureProperties.currentArmorclass = parseInt(event.target.value);
        this.setState({creaturesInBattle: creatureMap}, () => this.setToSessionStorage())
    };

    handleCurrentTypeChange = (event, id, label): void => {
        const creatureMap = this.state.creaturesInBattle;
        creatureMap.filter(creature => {
            return creature.id == id && creature.creatureProperties.label === label;
        })[0].creatureProperties.type = event.target.value;
        this.setState({creaturesInBattle: creatureMap}, () => this.setToSessionStorage())
    };

    determineLabel = (creatureViewModel: CreatureViewModel<PathfinderCreaturePropertiesViewModel>): number => {
        const sameCreature = this.state.creaturesInBattle.filter(elem => {
            return elem.name == creatureViewModel.name
        }).sort(function (cr1, cr2) {
            if (cr1.creatureProperties.label > cr2.creatureProperties.label) return 1;
            if (cr1.creatureProperties.label < cr2.creatureProperties.label) return -1;
            return 0;
        });
        if (sameCreature.length == 0) return 1;
        else return sameCreature[sameCreature.length - 1].creatureProperties.label + 1
    };

    componentDidMount = async (): Promise<void> => {
        const potentialEncounter = this.getFromSessionStorage();
        if (potentialEncounter) {
            //TODO make this work with view Models
            //this.setState({creaturesInBattle: potentialEncounter});
        }
        try {
            const creatureSerializerService = new CreatureSerializerService()
            const creatureData = await this.getAllCreatures();
            const creatureViewModels = creatureSerializerService.deserializeCreatures(creatureData.data)
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
            if (entry.creatureProperties.type === TypeEnum.MONSTER) {
                selectables[0].options.push({
                    value: entry.name,
                    label: <CreatureSelectLabel image={'monster-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name} CR: ${entry.creatureProperties.challenge}`}/>
                })
            } else if (entry.creatureProperties.type === TypeEnum.PLAYER) {
                selectables[1].options.push({
                    value: entry.name,
                    label: <CreatureSelectLabel image={'player-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name}`}/>
                })
            } else if (entry.creatureProperties.type === TypeEnum.ALLY) {
                selectables[2].options.push({
                    value: entry.name,
                    label: <CreatureSelectLabel image={'ally-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name} CR: ${entry.creatureProperties.challenge}`}/>
                })
            } else if (entry.creatureProperties.type == TypeEnum.SUMMON) {
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
                label: <CreatureSelectLabel image={`${creature.creatureProperties.type}-icon.png`}
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
        clonedCreatureViewModel.creatureProperties.label =
            clonedCreatureViewModel.creatureProperties.label == null
            ? this.determineLabel(clonedCreatureViewModel) : clonedCreatureViewModel.creatureProperties.label
        return clonedCreatureViewModel;
    };

    sortCreatureMap = (
        creatureMap: Array<CreatureViewModel<PathfinderCreaturePropertiesViewModel>>
    ): Array<CreatureViewModel<PathfinderCreaturePropertiesViewModel>> => {
        return creatureMap.sort((creatureA, creatureB) => {
            if (creatureA.creatureProperties.currentInitiative < creatureB.creatureProperties.currentInitiative) return 1;
            if (creatureA.creatureProperties.currentInitiative > creatureB.creatureProperties.currentInitiative) return -1;
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
                                type={creature.creatureProperties.type}
                                hitpoints={creature.creatureProperties.hitpoints}
                                label={creature.creatureProperties.label}
                                attackProperties={creature.creatureProperties.attackProperties}
                                xp={creature.creatureProperties.xp}
                                armorclass={creature.creatureProperties.armorclass}
                                alignment={creature.creatureProperties.alignment}
                                creatureClass={creature.creatureProperties.creatureClass}
                                challenge={creature.creatureProperties.challenge}
                                movement={creature.creatureProperties.movement}
                                image={creature.creatureProperties.image}
                                ini={creature.creatureProperties.ini}
                                currentIni={creature.creatureProperties.currentInitiative}
                                currentHP={creature.creatureProperties.currentHitpoints}
                                currentAC={creature.creatureProperties.currentArmorclass}
                                baseAtk={creature.creatureProperties.baseAtk}
                                size={creature.creatureProperties.size}
                                stats={creature.creatureProperties.stats}
                                sortByIni={this.sortByIni}
                                handleCurrentACChange={this.handleCurrentACChange}
                                handleCurrentHPChange={this.handleCurrentHPChange}
                                handleCurrentTypeChange={this.handleCurrentTypeChange}
                                handleRemoveFromEncounter={this.handleRemoveFromEncounter}
                                saveThrows={creature.creatureProperties.saveThrows}
                                skills={creature.creatureProperties.skills}
                                talents={creature.creatureProperties.talents}
                                actions={creature.creatureProperties.actions}
                                languages={creature.creatureProperties.languages}
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
