import * as React from "react";
import {action, attackProperty, CreatureCard, saveThrowsType, statblock} from "../../creaturecard/CreatureCard";
import * as style from './creature.module.css';


export interface ICreatureProps {
    id: string,
    name: string,
    type: "ally"|"monster"|"player"|"",
    hitpoints: number,
    armorclass: number,
    alignment: string,
    creatureClass: string,
    attackProperties?: attackProperty[],
    challenge: number,
    movement: number,
    ini: number,
    currentIni: number,
    baseAtk: number,
    xp?: number,
    size: string,
    stats: statblock,
    kmb: number,
    kmv: number,
    sortByIni,
    saveThrows: saveThrowsType,
    languages?: string[],
    senses?: string[],
    skills?: string[],
    talents?: string[],
    actions?: action[],
}

export interface ICreatureState {
    hitpoints: number
    armorclass: number
    currentIni: number
    type:"ally"|"monster"|"player"|""
}

export class Creature extends React.Component<ICreatureProps, ICreatureState> {

    constructor(props) {
        super(props);
        this.state= {
            hitpoints: this.props.hitpoints || 0,
            armorclass: this.props.armorclass || 0,
            currentIni: this.props.currentIni || 0,
            type: this.props.type || "",
        };
        this.handleIniChange = this.handleIniChange.bind(this);
        this.handleACChange = this.handleACChange.bind(this);
        this.handleHPChange = this.handleHPChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    MONSTER_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(47,2,2,1) 70%, rgba(255,0,9,1) 100%)";
    PLAYER_GRADIENT =  "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(9,115,121,1) 70%, rgba(0,241,255,1) 100%)";
    ALLY_GRADIENT =  "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(2,47,18,1) 70%, rgba(0,255,128,1) 100%)";
    DEFAULT_BG = "black";

    handleIniChange(event) {
        this.setState({currentIni: event.target.value})
    }

    handleACChange(event) {
        this.setState({armorclass: event.target.value})
    }

    handleHPChange(event) {
        this.setState({hitpoints: event.target.value})
    }

    handleTypeChange(event) {
        this.setState({type: event.target.value})
    }

    determineGradientType(): object {
        switch (this.state.type) {
            case 'monster':
                return {
                    background: this.MONSTER_GRADIENT
                };
            case 'ally':
                return {
                    background: this.ALLY_GRADIENT
                };
            case 'player':
                return {
                    background: this.PLAYER_GRADIENT
                };
            default:
                return {
                    background: this.DEFAULT_BG
                }
        }
    }

    render(): any {
        return (
            <div className={style.creatureDisplayContainer}>
                <CreatureCard
                    name={this.props.name}
                    hitpoints={this.props.hitpoints}
                    challenge={this.props.challenge}
                    armorclass={this.props.armorclass}
                    attackProperties={this.props.attackProperties}
                    alignment={this.props.alignment}
                    baseAtk={this.props.baseAtk}
                    creatureClass={this.props.creatureClass}
                    ini={this.props.ini}
                    movement={this.props.movement}
                    saveThrows={this.props.saveThrows}
                    size={this.props.size}
                    stats={this.props.stats}
                    kmb={this.props.kmb}
                    kmv={this.props.kmv}
                    foldable={true}
                    languages={this.props.languages}
                    senses={this.props.senses}
                    skills={this.props.skills}
                    talents={this.props.talents}
                    actions={this.props.actions}
                />
                <div className={style.creatureCurrentContainer}>
                    <div className={style.nextToTitleContainer}>
                        <p className={style.statDisplay}>TP: <input type="number" className={style.inputField} value={this.state.hitpoints} onChange={this.handleHPChange}/></p>
                        <p className={style.statDisplay}>RK: <input type="number" className={style.inputField} value={this.state.armorclass} onChange={this.handleACChange}/></p>
                        <p className={style.statDisplay}>INI:<input type="number" className={style.inputField} defaultValue={this.state.currentIni} onBlur={e=>{this.handleIniChange(e); this.props.sortByIni(e,this.props.id)}}/></p>
                        <p className={style.statDisplay}>Type:
                            <input name="type" type="radio" value={"ally"} onChange={this.handleTypeChange}/>Ally
                            <input name="type" type="radio" value={"monster"} onChange={this.handleTypeChange}/>Monster
                            <input name="type" type="radio" value={"player"} onChange={this.handleTypeChange}/>Player
                        </p>
                    </div>
                    <div className={style.titleContainer}>
                        <h1 className={style.name} style={this.determineGradientType()}>Current</h1>
                        <div className={style.edge}/>
                    </div>
                </div>
            </div>
        )
    }
}