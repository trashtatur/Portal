import * as React from 'react'
import {creatureType} from "../../../../../../componentTypes";
import {ReactElement} from "react";
import * as style from './roundCreature.css';

const PLAYER_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(2,35,47,0.6727065826330532) 57%, rgba(0,232,255,1) 100%)";
const MONSTER_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(47,2,2,0.6727065826330532) 57%, rgba(255,0,0,1) 100%)";
const ALLY_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(2,47,18,0.6727065826330532) 57%, rgba(0,255,128,1) 100%)";
const SUMMON_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(67,1,64,0.4654236694677871) 57%, rgba(67,1,64,1) 100%)";

interface RoundCreaturePropsInterface {
    id: string;
    name: string;
    entryHP: number;
    currentHP: number;
    entryAC: number;
    currentAC: number;
    entryIni: number;
    currentIni: number;
    entryType: creatureType;
    currentType: creatureType;
}

export class RoundCreature extends React.Component<RoundCreaturePropsInterface> {

    determineTypeIcon = (): string => {
        return `images/selectableLabelIcons/${this.props.currentType}-icon.png`
    };

    determineIconBackgroundColor = (type: string): string => {
        switch (type) {
            case 'HP':
                return 'red';
            case 'AC':
                return 'cadetblue';
            case 'INI':
                return 'limegreen';
            case 'TYPE':
                return 'orange';
            default:
                return;
        }
    };

    determineHPChange = (): ReactElement => {
        if (this.props.currentHP != this.props.entryHP) {
            return (
                <p className={style.attributeEntry}>{this.props.entryHP} ⟶ {this.props.currentHP}&nbsp;
                    <img
                        src={"images/roundSymbols/hp.png"}
                        alt={"round hitpoints symbol"}
                        className={style.creatureIcon}
                        style={{backgroundColor: this.determineIconBackgroundColor('HP')}}
                    />
                </p>)
        }
        return null
    };

    determineACChange = (): ReactElement => {
        if (this.props.currentAC != this.props.entryAC) {
            return (
                <p className={style.attributeEntry}> {this.props.entryAC} ⟶ {this.props.currentAC}&nbsp;
                    <img
                        src={"images/roundSymbols/ac.png"}
                        alt={"round armorclass symbol"}
                        className={style.creatureIcon}
                        style={{backgroundColor: this.determineIconBackgroundColor('AC')}}
                    />
                </p>
            )
        }
        return null
    };

    determineIniChange = (): ReactElement => {
        if (this.props.currentIni != this.props.entryIni) {
            return (
                <p className={style.attributeEntry}>{this.props.entryIni} ⟶ {this.props.currentIni}&nbsp;
                    <img
                        src={"images/roundSymbols/ini.png"}
                        alt={"Round initiative symbol"}
                        className={style.creatureIcon}
                        style={{backgroundColor: this.determineIconBackgroundColor('INI')}}
                    />
                </p>
            )
        }
        return null
    };

    determineTypeChange = (): ReactElement => {
        if (this.props.currentType != this.props.entryType) {
            return (
                <p className={style.attributeEntry}>{this.props.entryType} ⟶ {this.props.currentType}&nbsp;
                    <img
                        src={"images/roundSymbols/type.png"}
                        alt={"Round creature type symbol"}
                        className={style.creatureIcon}
                        style={{backgroundColor: this.determineIconBackgroundColor('TYPE')}}
                    />
                </p>
            )
        }
        return null
    };

    determineTitleBackground = (): string =>  {
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
    };

    render(): ReactElement {
        return (
            <div className={style.roundCreatureContainer}>
                <div style={{background: this.determineTitleBackground()}}
                    className={style.creatureName}>{this.props.name}&nbsp;
                    <img src={this.determineTypeIcon()}
                         alt={"creature initial type"}
                         className={style.creatureTitleType}/>
                </div>
                {this.determineHPChange()}
                {this.determineACChange()}
                {this.determineIniChange()}
                {this.determineTypeChange()}
            </div>
        )
    }
}