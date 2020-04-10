import * as React from 'react'
import {round} from "../../../../componentTypes";
import {RoundCreature} from "./round creature/RoundCreature";
import {ReactElement} from "react";
import {createPortal} from "react-dom";
import * as style from './singleRound.css'

interface SingleRoundProps {
    roundData: round;
    pastRounds: round[];
    roundDetailsPortal: HTMLElement;
    isActive: boolean;
    isSelected: boolean;
    selectThisRound: Function;
}

interface SingleRoundState {
    isActive: boolean;
}

export class SingleRound extends React.Component<SingleRoundProps, SingleRoundState> {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        }
    }

    inactive_icon = "◌";
    active_icon = "⭗";
    active_color = "dodgerblue";
    inactive_color = "orange";

    ifActiveRound = (): string => {
        if (this.props.isActive) return this.active_icon;
        return this.inactive_icon
    };

    ifActiveRoundColor = (): string => {
        if (this.props.isActive) return this.active_color;
        return this.inactive_color
    };

    ifSelectedRoundBoxShadow = (): string => {
        if (this.props.isSelected) {
            return '0px 0px 9px 0px rgba(13,13,14,1)';
        }
        return '';
    };

    selectThisRound = (): void => {
        this.props.selectThisRound(this.props.roundData.number);
    };

    render(): ReactElement {
        return (
            <div>
                <div className={style.roundHeader}>
                    <span>{this.props.roundData.startedAt.toLocaleTimeString()}</span>
                    <span style={{color: this.ifActiveRoundColor()}}>Round {this.props.roundData.number} {this.ifActiveRound()}</span>
                </div>
                <button
                    className={style.singleRoundButton}
                    style={{boxShadow: this.ifSelectedRoundBoxShadow()}}
                    onClick={this.selectThisRound}
                />
                {this.props.roundDetailsPortal !== null && this.props.isSelected &&
                createPortal(this.props.roundData.creatureEvents.map((elem, i) => {
                    return <RoundCreature
                        key={i}
                        id={elem.id}
                        name={elem.name}
                        entryHP={elem.entryHP}
                        currentHP={elem.currentHP}
                        entryAC={elem.entryAC}
                        currentAC={elem.currentAC}
                        entryIni={elem.entryIni}
                        currentIni={elem.currentIni}
                        entryType={elem.entryType}
                        currentType={elem.currentType}
                    />
                }), this.props.roundDetailsPortal)}
            </div>
        )
    }
}