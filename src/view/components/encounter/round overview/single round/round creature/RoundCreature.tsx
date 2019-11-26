import * as React from 'react'
import {roundCreature} from "../../../../componentTypes";
import {ReactElement} from "react";
import * as style from './roundCreature.module.css';

export interface IRoundCreatureProps extends roundCreature {

}

export interface IRoundCreatureState {

}

const PLAYER_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(2,35,47,0.6727065826330532) 57%, rgba(0,232,255,1) 100%)";
const MONSTER_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(47,2,2,0.6727065826330532) 57%, rgba(255,0,0,1) 100%)";
const ALLY_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(2,47,4,0.6727065826330532) 57%, rgba(23,119,1,1) 100%)";

export class RoundCreature extends React.Component<IRoundCreatureProps, IRoundCreatureState> {

    constructor(props) {
        super(props);
        this.determineHPChange = this.determineHPChange.bind(this);
        this.determineTypeIcon = this.determineTypeIcon.bind(this);
        this.determineACChange = this.determineACChange.bind(this);
        this.determineHPChange = this.determineHPChange.bind(this);
        this.determineIniChange = this.determineIniChange.bind(this);
        this.determineTypeChange = this.determineTypeChange.bind(this);
        this.determineTitleBackground = this.determineTitleBackground.bind(this);
    }


    determineTypeIcon(): string {
        return `images/selectableLableIcons/${this.props.currentType}-icon.png`
    }

    determineHPChange(): ReactElement {
        if (this.props.currentHP != this.props.entryHP) {
            return (
                <p className={style.attributeEntry}>{this.props.entryHP} changed to {this.props.currentHP}&nbsp;
                    <img
                        src={"images/roundSymbols/hp.png"}
                        className={style.creatureIcon}
                    />
                </p>)
        }
        return null
    }

    determineACChange(): ReactElement {
        if (this.props.currentAC != this.props.entryAC) {
            return (
                <p className={style.attributeEntry}> {this.props.entryAC} changed to {this.props.currentAC}&nbsp;
                    <img
                        src={"images/roundSymbols/ac.png"}
                        className={style.creatureIcon}
                    />
                </p>
            )
        }
        return null
    }

    determineIniChange(): ReactElement {
        if (this.props.currentIni != this.props.entryIni) {
            return (
                <p className={style.attributeEntry}>{this.props.entryIni} changed to {this.props.currentIni}&nbsp;
                    <img
                        src={"images/roundSymbols/ini.png"}
                        className={style.creatureIcon}
                    />
                </p>
            )
        }
        return null
    }

    determineTypeChange(): ReactElement {
        if (this.props.currentType != this.props.entryType) {
            return (
                <p className={style.attributeEntry}>{this.props.entryType} changed to {this.props.currentType}&nbsp;
                    <img
                        src={"images/roundSymbols/type.png"}
                        className={style.creatureIcon}
                    />
                </p>
            )
        }
        return null
    }

    determineTitleBackground() {
        switch (this.props.currentType) {
            case "ally":
                return ALLY_GRADIENT;
            case "monster":
                return MONSTER_GRADIENT;
            case "player":
                return PLAYER_GRADIENT;
            default:
                return ""
        }
    }

    render(): any {
        return (
            <div className={style.roundCreatureContainer}>
                <h4 style={{background: this.determineTitleBackground()}}
                    className={style.creatureName}>{this.props.name}&nbsp;<img src={this.determineTypeIcon()}
                                                                               className={style.creatureTitleType}/>
                </h4>
                {this.determineHPChange()}
                {this.determineACChange()}
                {this.determineIniChange()}
                {this.determineTypeChange()}
            </div>
        )
    }
}