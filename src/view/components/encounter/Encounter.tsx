import * as React from "react";
import {Creature} from "./creature/Creature";
import {saveThrowsType, statblock} from "../creaturecard/CreatureCard";
import * as style from './encounter.module.css';
import {CreatureSelect} from "./creatureSelect/CreatureSelect";


type creature = {
    id: string,
    name: string,
    hitpoints: number,
    armorclass: number,
    alignment: string,
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
    actions: string[]
}


export interface IEncounterProps {
}

export interface IEncounterState {
    creatureMap: creature[]
}

export class Encounter extends React.Component<IEncounterProps, IEncounterState> {
    constructor(props) {
        super(props);
        this.sortByIni = this.sortByIni.bind(this);
        this.addCreature = this.addCreature.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            creatureMap: []
        }
    }

    creatureSelect = null;

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

    addCreature() {
        let creatureMap = this.state.creatureMap;
        let creatureEntry =
            {
                id: this.uuidv4(),
                name: Math.random().toString(36).substring(7),
                hitpoints: 15,
                armorclass: 15,
                alignment: 'neutral',
                creatureClass: 'goblinoid',
                challenge: 4,
                movement: 4,
                ini: 2,
                currentIni: Math.floor(Math.random() * 20) + 2,
                baseAtk: 4,
                xp: 3311,
                kmb: 12,
                kmv: 12,
                sortByIni: this.sortByIni,
                skills: ['Schleichen +7'],
                senses: ['Dunkelsicht'],
                size: 'kolossal',
                stats: {"str": 10, "dex": 33, "wis": 11, "int": 44, "cha": 33, "con": 22},
                saveThrows: {"ref": 10, "will": 33, "fort": 45},
                languages: ["Gemeinsprache"],
                talents: ['Ausweichen'],
                actions: ["blaa"]
            };
        creatureMap.push(creatureEntry);
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
        var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    onSelect() {

    }


    render(): any {

        return (
            <div>
                <div>
                    <CreatureSelect
                        selectableOptions={[{value:"Torsten",label:"Torsten"},{value:"Torben",label:"Torben"}]}
                        onSelect={this.onSelect}
                        ref={ref=> {this.creatureSelect=ref}}
                    />
                    <button className={style.creatureAddButton} type="button" onClick={this.addCreature}>Add Creature</button>
                </div>
                {this.state.creatureMap.map((creature, i) => {
                    return (
                        <Creature
                            id={creature.id}
                            name={creature.name}
                            hitpoints={creature.hitpoints}
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
