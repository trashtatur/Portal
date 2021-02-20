import * as React from 'react'
import {PathfinderCreatureForm} from "../PathfinderCreatureForm";
import Select from 'react-select';
import axios from "axios";
import {selectableCreatures} from "@/public/types/frontendTypes";
import {ReactElement} from "react";
import {CreatureSelectLabel} from "../../../../uiBasic/creatureSelectLabel/CreatureSelectLabel";
import {CreatureViewModel} from "@/public/model/CreatureViewModel";
import {CreatureViewModelFactory} from "@/public/factory/CreatureViewModelFactory";
import {PathfinderCreaturePropertiesViewModel} from "@/public/model/pathfinder/PathfinderCreaturePropertiesViewModel";
import * as style from './creatureEditWrapper.css';


export interface CreatureEditWrapperState {
    creature: CreatureViewModel<PathfinderCreaturePropertiesViewModel>;
    originalCreature: CreatureViewModel<PathfinderCreaturePropertiesViewModel>;
    creatureData;
}

export class CreatureEditWrapper extends React.Component<{}, CreatureEditWrapperState> {

    constructor(props) {
        super(props);
        this.state = {
            creature: null,
            creatureData: [],
            originalCreature: null
        };

        this.composeSelectableCreatureOptions = this.composeSelectableCreatureOptions.bind(this);
        this.handleCreatureSelect = this.handleCreatureSelect.bind(this);
        this.getAllCreatures = this.getAllCreatures.bind(this);
    }
    creatureViewModelFactory = new CreatureViewModelFactory();
    formRef: PathfinderCreatureForm = null;

    composeSelectableCreatureOptions(): selectableCreatures[] {
        const selectables = [
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

        this.state.creatureData.forEach(entry => {
            if (entry.type == "monster") {
                selectables[0].options.push({
                    value: {name: entry.name, challenge: entry.challenge},
                    label: <CreatureSelectLabel image={'monster-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name} CR: ${entry.challenge}`}/>
                })
            } else if (entry.type == "player") {
                selectables[1].options.push({
                    value: {name: entry.name, challenge: entry.challenge},
                    label: <CreatureSelectLabel image={'player-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name}`}/>
                })
            } else if (entry.type == "ally") {
                selectables[2].options.push({
                    value: entry.name,
                    label: <CreatureSelectLabel image={'ally-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name} CR: ${entry.challenge}`}/>
                })
            } else if (entry.type == "summon") {
                selectables[3].options.push({
                    value: entry.name,
                    label: <CreatureSelectLabel image={'summon-icon.png'}
                                                creature={entry}
                                                labelText={`${entry.name} CR: ${entry.challenge}`}/>
                })
            }
        });
        return selectables
    }

    componentDidMount(): void {
        this.getAllCreatures()
    }

    async getAllCreatures(): Promise<void> {
        const creatures = await axios.get('/V1/Creature');
        this.setState({creatureData: creatures.data})
    }

    handleCreatureSelect(value): void {
        const filtered: CreatureViewModel<PathfinderCreaturePropertiesViewModel> =
            this.state.creatureData.find(elem => {
            return (elem.name == value.value.name && elem.challenge == value.value.challenge)
        });
        const creature = this.creatureViewModelFactory.createFromExisting(filtered)
        this.setState({originalCreature: creature});
        this.setState({creature: creature});
        this.formRef.setState({creature: creature});
    }

    handleUpdate(): void {
        axios.put(`/update/${this.state.originalCreature.name}/${this.state.originalCreature.creatureProperties.challenge}`,
            this.state.creature
        ).then(function (result) {
            console.log(result)
        }).catch(function (error) {
            console.log(error)
        })
    }

    render(): ReactElement {
        return (
            <div className={style.editFormContainer}>
                <Select
                    options={this.composeSelectableCreatureOptions()}
                    className={style.creatureEditSelect}
                    onChange={this.handleCreatureSelect}
                    maxMenuHeight={200}
                />
                {this.state.creature &&
                <PathfinderCreatureForm ref={ref => this.formRef = ref} type={"edit"} creature={this.state.creature}
                                        handleUpdate={this.handleUpdate}/>
                }
            </div>
        )
    }
}