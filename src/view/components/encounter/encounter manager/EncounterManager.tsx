import * as React from "react";
import {Encounter} from "../encounter holder/Encounter";
import {RoundOverview} from "../round overview/RoundOverview";
import {creature, creatureType, round, roundCreature} from "../../componentTypes";
import * as style from './encounterManager.module.css';


export interface IEncounterManagerProps {

}

export interface IEncounterManagerState {
    roundLog: round[]
    currentRound: round
}

export class EncounterManager extends React.Component<IEncounterManagerProps, IEncounterManagerState> {

    constructor(props) {
        super(props);
        this.state = {
            roundLog: [],
            currentRound: {
                active: true,
                number: 1,
                startedAt: new Date(),
                creatureEvents: []
            }
        };

        this.addRound = this.addRound.bind(this);
        this.resetRounds = this.resetRounds.bind(this);
        this.addCreatureToRound = this.addCreatureToRound.bind(this);
        this.transferCreatureEvents = this.transferCreatureEvents.bind(this);
        this.changeTypeOfRoundCreature = this.changeTypeOfRoundCreature.bind(this);
        this.changeCurrentIniOfCreature = this.changeCurrentIniOfCreature.bind(this);
        this.changeCurrentACOfCreature = this.changeCurrentACOfCreature.bind(this);
        this.changeCurrentHPOfCreature = this.changeCurrentHPOfCreature.bind(this);
        this.removeCreatureFromRound = this.removeCreatureFromRound.bind(this);
    }

    transferCreatureEvents(): roundCreature[] {
        let previousRound = this.state.roundLog[this.state.roundLog.length - 1];
        if (previousRound != undefined) return previousRound.creatureEvents.map(elem => {
            return {
                id: elem.id,
                name: elem.name,
                entryHP: elem.currentHP,
                currentHP: elem.currentHP,
                entryAC: elem.currentAC,
                currentAC: elem.currentAC,
                entryIni: elem.currentIni,
                currentIni: elem.currentIni,
                entryType: elem.currentType,
                currentType: elem.currentType
            }
        });
        else return []
    }

    addRound() {

        let phasingOutRound = this.state.currentRound;
        phasingOutRound.active = false;
        this.setState({
            roundLog: this.state.roundLog.concat([phasingOutRound])
        }, () => {
            let newRound: round = {
                number: this.state.roundLog.length + 1,
                active: true,
                startedAt: new Date(),
                creatureEvents: this.transferCreatureEvents()
            };
            this.setState({currentRound: newRound})
        });
    }

    resetRounds() {
        let creatureEvents: roundCreature[] = this.state.currentRound.creatureEvents.map(elem => {
            return {
                id: elem.id,
                name: elem.name,
                entryHP: elem.currentHP,
                currentHP: elem.currentHP,
                entryAC: elem.currentAC,
                currentAC: elem.currentAC,
                entryIni: elem.currentIni,
                currentIni: elem.currentIni,
                entryType: elem.currentType,
                currentType: elem.currentType
            }
        });
        this.setState({roundLog: []}, () =>
            this.setState({
                currentRound:
                    {
                        active: true,
                        number: 1,
                        startedAt: new Date(),
                        creatureEvents: creatureEvents
                    }
            })
        )
    }

    addCreatureToRound(creature: creature) {
        let name = creature.name;
        if (creature.label != 0) name = `${name} ${creature.label}`;
        let newRoundCreature: roundCreature =
            {
                id: creature.id,
                name: name,
                entryHP: creature.currentHP,
                currentHP: creature.currentHP,
                entryAC: creature.currentAC,
                currentAC: creature.currentAC,
                entryIni: creature.currentIni,
                currentIni: creature.currentIni,
                entryType: creature.type,
                currentType: creature.type
            };
        let currentRound = this.state.currentRound;
        this.state.currentRound.creatureEvents.push(newRoundCreature);
        this.setState({currentRound: currentRound})
    }

    changeCurrentHPOfCreature(newHPValue: number, creatureId: string) {
        let round = this.state.currentRound;
        round.creatureEvents.find(elem => {
            return elem.id == creatureId
        }).currentHP = newHPValue;
        this.setState({currentRound: round})
    }

    changeCurrentACOfCreature(newACValue: number, creatureId: string) {
        let round = this.state.currentRound;
        round.creatureEvents.find(elem => {
            return elem.id == creatureId
        }).currentAC = newACValue;
        this.setState({currentRound: round})
    }

    changeCurrentIniOfCreature(newIniValue: number, creatureId: string) {
        let round = this.state.currentRound;
        round.creatureEvents.find(elem => {
            return elem.id == creatureId
        }).currentIni = newIniValue;
        this.setState({currentRound: round})
    }

    changeTypeOfRoundCreature(newType: creatureType, creatureId: string) {
        let round = this.state.currentRound;
        round.creatureEvents.find(elem => {
            return elem.id == creatureId
        }).currentType = newType;
        this.setState({currentRound: round})
    }

    removeCreatureFromRound(creatureId: string) {
        let round = this.state.currentRound;
        round.creatureEvents = round.creatureEvents.filter(elem => {
            return elem.id != creatureId
        });
        this.setState({currentRound: round})
    }


    render(): any {
        return (
            <div className={style.encounterManagerContainer}>
                <Encounter
                    addCreatureToRound={this.addCreatureToRound}
                    changeCurrentACOfCreature={this.changeCurrentACOfCreature}
                    changeCurrentHPOfCreature={this.changeCurrentHPOfCreature}
                    changeCurrentIniOfCreature={this.changeCurrentIniOfCreature}
                    changeTypeOfRoundCreature={this.changeTypeOfRoundCreature}
                    removeCreatureFromRound={this.removeCreatureFromRound}
                />
                <div className={style.roundControls}>
                    <button className={style.roundControlButton} onClick={this.addRound}>Add round</button>
                    <button className={style.roundControlButton} onClick={this.resetRounds}>Reset rounds</button>
                </div>
                <RoundOverview roundLog={this.state.roundLog} currentRound={this.state.currentRound}/>
            </div>
        )
    }
}