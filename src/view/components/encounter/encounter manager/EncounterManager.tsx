import * as React from "react";
import {Encounter} from "./encounter/Encounter";
import {RoundOverview} from "./round overview/RoundOverview";
import {creature, creatureType, round, roundCreature} from "../../componentTypes";
import {ReactElement} from "react";
import * as style from './encounterManager.css';

export interface EncounterManagerState {
    roundLog: round[];
    currentRound: round;
}

export class EncounterManager extends React.Component<{}, EncounterManagerState> {

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


    setRoundLogToSessionStorage = (): void => {
        sessionStorage.setItem('encounterRoundLog', JSON.stringify(this.state.roundLog));
    };

    setCurrentRoundToSessionStorage = (): void => {
        sessionStorage.setItem('encounterCurrentRound', JSON.stringify(this.state.currentRound));
    };

    getRoundLogFromSessionStorage = (): round[] => {
        const stringRoundLogData = sessionStorage.getItem('encounterRoundLog');
        const roundLog: round[] = JSON.parse(stringRoundLogData);
        if (roundLog != null) {
            roundLog.forEach(round => {
                if (typeof round.startedAt == "string") {
                    round.startedAt = new Date(round.startedAt)
                }
            });
        }
        return roundLog
    };

    getCurrentRoundFromSessionStorage = (): round => {
        const stringCurrentRoundData = sessionStorage.getItem('encounterCurrentRound');
        const currentRound: round = JSON.parse(stringCurrentRoundData);
        if (currentRound != null && typeof currentRound.startedAt == "string") {
            currentRound.startedAt = new Date(currentRound.startedAt)
        }
        return currentRound;
    };

    componentDidMount(): void {
        const potentialRoundLog = this.getRoundLogFromSessionStorage();
        const potentialCurrentRound = this.getCurrentRoundFromSessionStorage();
        if (potentialCurrentRound) {
            this.setState({currentRound: potentialCurrentRound});
        }
        if (potentialRoundLog) {
            this.setState({roundLog: potentialRoundLog});
        }
    }

    transferCreatureEvents(): roundCreature[] {
        const previousRound = this.state.roundLog[this.state.roundLog.length - 1];
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

    addRound(): void {

        const phasingOutRound = this.state.currentRound;
        phasingOutRound.active = false;
        this.setState({
            roundLog: this.state.roundLog.concat([phasingOutRound]),
        }, () => {
            this.setRoundLogToSessionStorage();
            const newRound: round = {
                number: this.state.roundLog.length + 1,
                active: true,
                startedAt: new Date(),
                creatureEvents: this.transferCreatureEvents()
            };
            this.setState({currentRound: newRound},
                () => this.setCurrentRoundToSessionStorage())
        });
    }

    resetRounds(): void {
        const creatureEvents: roundCreature[] = this.state.currentRound.creatureEvents.map(elem => {
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
            }, () => {
                this.setRoundLogToSessionStorage();
                this.setCurrentRoundToSessionStorage()
            })
        )
    }

    addCreatureToRound(creatureToAdd: creature): void {
        let name = creatureToAdd.name;
        if (creatureToAdd.label != 0) name = `${name} ${creatureToAdd.label}`;
        const newRoundCreature: roundCreature =
            {
                id: creatureToAdd.id,
                name: name,
                entryHP: creatureToAdd.currentHP,
                currentHP: creatureToAdd.currentHP,
                entryAC: creatureToAdd.currentAC,
                currentAC: creatureToAdd.currentAC,
                entryIni: creatureToAdd.currentIni,
                currentIni: creatureToAdd.currentIni,
                entryType: creatureToAdd.type,
                currentType: creatureToAdd.type
            };
        const currentRound = this.state.currentRound;
        currentRound.creatureEvents.push(newRoundCreature);
        this.setState({currentRound: currentRound},
            () => this.setCurrentRoundToSessionStorage())
    }

    changeCurrentHPOfCreature(newHPValue: number, creatureId: string): void {
        const round = this.state.currentRound;
        round.creatureEvents.find(elem => {
            return elem.id == creatureId
        }).currentHP = newHPValue;
        this.setState({currentRound: round},
            () => this.setCurrentRoundToSessionStorage())
    }

    changeCurrentACOfCreature(newACValue: number, creatureId: string): void {
        const round = this.state.currentRound;
        round.creatureEvents.find(elem => {
            return elem.id == creatureId
        }).currentAC = newACValue;
        this.setState({currentRound: round},
            () => this.setCurrentRoundToSessionStorage())
    }

    changeCurrentIniOfCreature(newIniValue: number, creatureId: string): void {
        const round = this.state.currentRound;
        round.creatureEvents.find(elem => {
            return elem.id == creatureId
        }).currentIni = newIniValue;
        this.setState({currentRound: round},
            () => this.setCurrentRoundToSessionStorage())
    }

    changeTypeOfRoundCreature(newType: creatureType, creatureId: string): void {
        const round = this.state.currentRound;
        round.creatureEvents.find(elem => {
            return elem.id == creatureId
        }).currentType = newType;
        this.setState({currentRound: round},
            () => this.setCurrentRoundToSessionStorage())
    }

    removeCreatureFromRound(creatureId: string): void {
        const round = this.state.currentRound;
        round.creatureEvents = round.creatureEvents.filter(elem => {
            return elem.id != creatureId
        });
        this.setState({currentRound: round},
            () => this.setCurrentRoundToSessionStorage())
    }


    render(): ReactElement {
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