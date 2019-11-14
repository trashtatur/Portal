import * as React from "react";
import {Creature} from "./creature/Creature";
import {action, attackProperty, saveThrowsType, statblock} from "../creaturecard/CreatureCard";
import {CreatureSelect} from "./creatureSelect/CreatureSelect";
import axios from 'axios';
import * as style from './encounter.module.css';


type creature = {
    id: string,
    name: string,
    type: string,
    hitpoints: number,
    armorclass: number,
    alignment: string,
    attackProperties: attackProperty[],
    creatureClass: string,
    challenge: number,
    movement: number,
    ini: number,
    currentIni: number,
    baseAtk: number,
    xp: number,
    kmb: number,
    kmv: number,
    sortByIni: any,
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
        let selectables = [];
        this.state.creatureDataMap.forEach(entry => {
            selectables.push({value: entry.name, label: entry.name})
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
            id: this.uuidv4(),
            name: elem.name,
            type: elem.type,
            hitpoints: elem.hitpoints,
            armorclass: elem.armorclass,
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


    uuidv4() {
        var d = new Date().getTime();//Timestamp
        var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if (d > 0) {//Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
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
                        alignment: filtered[0].alignment,
                        attackProperties:
                            JSON.parse(filtered[0].attackProperties) == null ? null :
                                JSON.parse(filtered[0].attackProperties).props.map(
                                    elem => {
                                        return {
                                            name: elem.name,
                                            property: elem.property
                                        }
                                    }),
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
                <div>
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
                            attackProperties={creature.attackProperties}
                            key={this.uuidv4()}
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
