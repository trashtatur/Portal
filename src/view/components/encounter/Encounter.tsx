import * as React from "react";
import {Creature} from "./creature/Creature";
import {action, attackProperty, saveThrowsType, statblock} from "../creaturecard/CreatureCard";
import {CreatureSelect} from "./creatureSelect/CreatureSelect";
import axios from 'axios';
import {uuidv4} from "../helper/helperFunctions";
import * as style from './encounter.module.css';


export type creature = {
    id?: string,
    name: string,
    type: "ally"|"monster"|"player"|"",
    hitpoints,
    armorclass,
    label?: number,
    alignment: string,
    attackProperties: attackProperty[],
    creatureClass: string,
    challenge,
    movement,
    ini,
    currentIni?,
    baseAtk,
    xp,
    kmb,
    kmv,
    sortByIni?: any,
    skills: string[],
    senses: string[],
    size: string,
    stats: statblock,
    saveThrows: saveThrowsType,
    languages: string[],
    talents: string[]
    actions: action[]
}


export interface IEncounterProps {
}

export interface IEncounterState {
    creatureMap: creature[]
    creatureDataMap
}

export class Encounter extends React.Component<IEncounterProps, IEncounterState> {
    constructor(props) {
        super(props);
        this.sortByIni = this.sortByIni.bind(this);
        this.addCreatures = this.addCreatures.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            creatureMap: [],
            creatureDataMap: []
        }
    }

    creatures_to_add = [];
    creatureSelect = null;

    /**
     * Sorts creature list by initiative
     * @param event
     * @param id
     */
    sortByIni(event, id) {
        let creatureMap = this.state.creatureMap;
        creatureMap.filter(creature => {
            return creature.id == id
        })[0].currentIni = parseInt(event.target.value);
        let creatureMapSorted = creatureMap.sort((creatureA, creatureB) => {
            if (creatureA.currentIni < creatureB.currentIni) return 1;
            if (creatureA.currentIni > creatureB.currentIni) return -1;
            return 0;
        });
        this.setState({creatureMap: creatureMapSorted})
    }

    determineLabel(creatureName:string): number {
        let same_creature = this.state.creatureMap.filter(elem => {
            return elem.name == creatureName
        });
        if (same_creature.length == 0) return null;
        else return same_creature.length +1
    }

    componentDidMount(): void {
        this.getAllCreatures().then(result => {
            this.setState({creatureDataMap: result.data})
        });
    }

    async getAllCreatures() {
        let creatures = await axios.get(
            '/V1/creature'
        );
        return creatures;
    }

    /**
     * Composes dropdown to select creatures
     */
    composeSelectableOptions(): any[] {
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

        this.state.creatureDataMap.forEach(entry => {
            if (entry.type == "monster") {
                selectables[0].options.push({value: entry.name, label: <div><img src="images/selectableLableIcons/monster-icon.png" height="20px" width="20px"/>{entry.name}</div>})
            } else if (entry.type =="player") {
                selectables[1].options.push({value: entry.name, label: <div><img src="images/selectableLableIcons/player-icon.png" height="20px" width="20px"/>{entry.name}</div>})
            } else if (entry.type == "ally") {
                selectables[2].options.push({value: entry.name, label: <div><img src="images/selectableLableIcons/ally-icon.png" height="20px" width="20px"/>{entry.name}</div>})

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
        let stats:statblock = {
            str: elem.stats.str, int: elem.stats.int, wis:elem.stats.wis,
            dex: elem.stats.dex, con: elem.stats.con, cha: elem.stats.cha
        };
        let savethrows:saveThrowsType = {
          ref: elem.saveThrows.ref, will:elem.saveThrows.will, fort:elem.saveThrows.fort
        };
        let creature = {
            id: uuidv4(),
            name: elem.name,
            type: elem.type,
            hitpoints: elem.hitpoints,
            armorclass: elem.armorclass,
            label: elem.label == null ? this.determineLabel(elem.name) : elem.label,
            alignment: elem.alignment,
            attackProperties: elem.attackProperties,
            creatureClass: elem.creatureClass,
            challenge: elem.challenge,
            movement: elem.movement,
            ini: elem.ini,
            currentIni: Math.floor(Math.random()*(+20 - +1) + +1) + elem.ini,
            baseAtk: elem.baseAtk,
            xp: elem.xp,
            kmb: elem.kmb,
            kmv: elem.kmv,
            sortByIni: this.sortByIni,
            skills: elem.skills,
            senses: elem.senses,
            size: elem.size,
            stats: stats,
            saveThrows: savethrows,
            languages: elem.languages,
            talents: elem.talents,
            actions: elem.actions
        };
        return creature;
    }

    /**
     * Adds selected creatures
     */
    addCreatures() {
        let to_add = this.creatures_to_add.map(elem => {
            return this.cloneEntry(elem)
        });
        let creatureMap = this.state.creatureMap;
        creatureMap = creatureMap.concat(to_add);
        let creatureMapSorted = creatureMap.sort((creatureA, creatureB) => {
            if (creatureA.currentIni < creatureB.currentIni) return 1;
            if (creatureA.currentIni > creatureB.currentIni) return -1;
            return 0;
        });
        this.setState({
            creatureMap: creatureMapSorted
        });
    }



    /**
     * Reacts to select or remove event.
     * and then preps the selected creatures for creation
     * @param selected
     * @param option
     */
    onSelect(selected, option) {
        if (option.action == 'select-option') {
            let creatures_to_add: creature[] = [];
            let filtered = [];
            selected.forEach(name => {
                filtered = this.state.creatureDataMap.filter(elem => {
                    return elem.name == name.value
                });
                creatures_to_add.push(
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
                        ini: filtered[0].ini,
                        currentIni: Math.floor(Math.random()*(+20 - +1) + +1) + filtered[0].ini,
                        baseAtk: filtered[0].baseAtk,
                        xp: filtered[0].xp || 0,
                        kmb: filtered[0].kmb || 0,
                        kmv: filtered[0].kmv || 0,
                        sortByIni: this.sortByIni,
                        skills: filtered[0].skills == [] ? [] : filtered[0].skills.map(elem => {
                            return elem.name
                        }),
                        senses: filtered[0].senses == [] ? [] : filtered[0].senses.map(elem => {
                            return elem.name
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
                    }
                )
            });
            this.creatures_to_add = creatures_to_add;
        }
        if (option.action == 'remove-value') {
            this.creatures_to_add = this.creatures_to_add.filter(elem => {
                return elem.name != option.removedValue.value
            })
        }
    }


    render(): any {
        return (
            <div>
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
                {this.state.creatureMap.map((creature, i) => {
                    return (
                        <Creature
                            id={creature.id}
                            name={creature.name}
                            type={creature.type}
                            hitpoints={creature.hitpoints}
                            label={creature.label}
                            attackProperties={creature.attackProperties}
                            key={uuidv4()}
                            armorclass={creature.armorclass}
                            alignment={creature.alignment}
                            creatureClass={creature.creatureClass}
                            challenge={creature.challenge}
                            movement={creature.movement}
                            ini={creature.ini}
                            currentIni={creature.currentIni}
                            baseAtk={creature.baseAtk}
                            size={creature.size}
                            stats={creature.stats}
                            kmb={creature.kmb}
                            kmv={creature.kmv}
                            sortByIni={creature.sortByIni}
                            saveThrows={creature.saveThrows}
                            skills={creature.skills}
                            senses={creature.senses}
                            talents={creature.talents}
                            actions={creature.actions}
                            languages={creature.languages}
                        />
                    )
                })}
            </div>
        )
    }
}
