import * as React from 'react'
import {roundCreature} from "../../../../componentTypes";
import {ReactElement} from "react";
import * as style from './roundCreature.css';

const PLAYER_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(2,35,47,0.6727065826330532) 57%, rgba(0,232,255,1) 100%)";
const MONSTER_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(47,2,2,0.6727065826330532) 57%, rgba(255,0,0,1) 100%)";
const ALLY_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(2,47,18,0.6727065826330532) 57%, rgba(0,255,128,1) 100%)";
const SUMMON_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(67,1,64,0.4654236694677871) 57%, rgba(67,1,64,1) 100%)";

export class RoundCreature extends React.Component<roundCreature> {

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
        return `images/selectableLabelIcons/${this.props.currentType}-icon.png`
    }

    determineHPChange(): ReactElement {
        if (this.props.currentHP != this.props.entryHP) {
            return (
                <p className={style.attributeEntry}>{this.props.entryHP} changed to {this.props.currentHP}&nbsp;
                    <img
                        src={"images/roundSymbols/hp.png"}
                        alt={"round hitpoints symbol"}
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
                        alt={"round armorclass symbol"}
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
                        alt={"Round initiative symbol"}
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
                        alt={"Round creature type symbol"}
                        className={style.creatureIcon}
                    />
                </p>
            )
        }
        return null
    }

    determineTitleBackground(): string {
        switch (this.props.currentType) {
            case "ally":
                return ALLY_GRADIENT;
            case "monster":
                return MONSTER_GRADIENT;
            case "player":
                return PLAYER_GRADIENT;
            case "summon":
                return SUMMON_GRADIENT;
            default:
                return ""
        }
    }

    render(): ReactElement {
        return (
            <div className={style.roundCreatureContainer}>
                <h4 style={{background: this.determineTitleBackground()}}
                    className={style.creatureName}>{this.props.name}&nbsp;<img src={this.determineTypeIcon()}
                                                                               alt={"creature initial type"}
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