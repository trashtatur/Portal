import * as React from 'react'
import {CreatureForm} from "../CreatureForm";
import Select from 'react-select';
import axios from "axios";
import {creature} from "../../../componentTypes";
import {uuidv4} from "../../../helper/helperFunctions";
import * as style from './creatureEditWrapper.module.css';


export interface ICreatureEditWrapperProps {

}

export interface ICreatureEditWrapperState {
    creature:creature
    originalCreature:creature
    creatureData
}

export class CreatureEditWrapper extends React.Component<ICreatureEditWrapperProps, ICreatureEditWrapperState> {

    constructor(props) {
        super(props);
        this.state = {
            creature: null,
            creatureData: [],
            originalCreature:null
        };

        this.composeSelectableCreatureOptions = this.composeSelectableCreatureOptions.bind(this);
        this.handleCreatureSelect = this.handleCreatureSelect.bind(this);
        this.getAllCreatures = this.getAllCreatures.bind(this);
    }

    formRef:CreatureForm = null;

    /**
     * Composes dropdown to select creatures
     */
    composeSelectableCreatureOptions(): any[] {
        let selectables = [
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
            }

        ];

        this.state.creatureData.forEach(entry => {
            if (entry.type == "monster") {
                selectables[0].options.push({
                    value: {name: entry.name, challenge: entry.challenge},
                    label: <div><img src="images/selectableLableIcons/monster-icon.png" height="20px"
                                     width="20px"/>{entry.name} CR:{entry.challenge}</div>
                })
            } else if (entry.type == "player") {
                selectables[1].options.push({
                    value: entry.name,
                    label: <div><img src="images/selectableLableIcons/player-icon.png" height="20px"
                                     width="20px"/>{entry.name}</div>
                })
            } else if (entry.type == "ally") {
                selectables[2].options.push({
                    value: entry.name,
                    label: <div><img src="images/selectableLableIcons/ally-icon.png" height="20px"
                                     width="20px"/>{entry.name} CR:{entry.challenge}</div>
                })

            }
        });
        return selectables
    }

    componentDidMount(): void {
        this.getAllCreatures()
    }

    async getAllCreatures() {
        let creatures = await axios.get('/V1/Creature');
        this.setState({creatureData: creatures.data})
    }

    handleCreatureSelect(value,option) {
        let filtered = this.state.creatureData.find(elem=>{
            return (elem.name == value.value.name && elem.challenge == value.value.challenge)
        });
        let creature:creature = {
            name: filtered.name,
            type: filtered.type,
            hitpoints: filtered.hitpoints,
            armorclass: filtered.armorclass,
            label: null,
            alignment: filtered.alignment,
            attackProperties:
                filtered.attackProperties == null ? null : filtered.attackProperties,
            creatureClass: filtered.creatureClass,
            challenge: filtered.challenge,
            movement: filtered.movement,
            image:filtered.image,
            ini: filtered.ini,
            baseAtk: filtered.baseAtk,
            xp: filtered.xp || 0,
            kmb: filtered.kmb || 0,
            kmv: filtered.kmv || 0,
            skills: filtered.skills == [] ? [] : filtered.skills.map(elem => {
                let level = elem.CreatureSkill.skillLevel;
                return {name:elem.name, level:level, id:uuidv4}
            }),
            size: filtered.size,
            stats: JSON.parse(filtered.stats) || {},
            saveThrows: JSON.parse(filtered.saveThrows) || {},
            languages: filtered.languages == [] ? [] : filtered.languages.map(elem => {
                return elem.name
            }),
            talents: filtered.talents == [] ? [] : filtered.talents.map(elem => {
                return elem.name
            }),
            actions: filtered.actions == [] ? [] : filtered.actions.map(elem => {
                return  {
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
        };
        this.setState({originalCreature:creature});
        this.setState({creature:creature});
        this.formRef.setState({creature:creature});
    }

    handleUpdate() {

    }

    render(): any {
        return (
            <div className={style.editFormContainer}>
                <Select
                    options={this.composeSelectableCreatureOptions()}
                    className={style.creatureEditSelect}
                    onChange={this.handleCreatureSelect}
                />
                {this.state.creature &&
                     <CreatureForm ref={ref=>this.formRef=ref} type={"edit"} creature={this.state.creature} handleUpdate={this.handleUpdate}/>
                }
            </div>
        )
    }
}