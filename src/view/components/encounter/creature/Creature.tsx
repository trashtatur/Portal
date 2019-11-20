import * as React from "react";
import {action, attackProperty, CreatureCard, saveThrowsType, statblock} from "../../creaturecard/CreatureCard";
import * as style from './creature.module.css';


export interface ICreatureProps {
    id: string,
    name: string,
    type: "ally"|"monster"|"player"|"",
    hitpoints: number,
    armorclass: number,
    label?:number,
    alignment: string,
    creatureClass: string,
    attackProperties?: attackProperty[],
    challenge: number,
    movement: number,
    image?,
    ini: number,
    currentIni: number,
    currentAC: number,
    currentHP: number,
    baseAtk: number,
    xp?: number,
    size: string,
    stats: statblock,
    kmb: number,
    kmv: number,
    sortByIni:Function,
    handleCurrentHPChange:Function,
    handleCurrentACChange:Function,
    handleCurrentTypeChange:Function,
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
    currentAC: number,
    currentHP: number,
    type:"ally"|"monster"|"player"|""
}

export class Creature extends React.Component<ICreatureProps, ICreatureState> {

    constructor(props) {
        super(props);
        this.state= {
            hitpoints: this.props.hitpoints || 0,
            armorclass: this.props.armorclass || 0,
            currentIni: this.props.currentIni || 0,
            currentAC: this.props.currentAC || 0,
            currentHP: this.props.currentHP || 0,
            type: this.props.type,
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
        this.setState({currentAC: event.target.value})
    }

    handleHPChange(event) {
        this.setState({currentHP: event.target.value})
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

    typeChecked(fieldValue: string): boolean {
        return this.state.type == fieldValue;
    }

    render(): any {
        return (
            <div className={style.creatureDisplayContainer}>
                <CreatureCard
                    name={this.props.name}
                    hitpoints={this.props.hitpoints}
                    challenge={this.props.challenge}
                    armorclass={this.props.armorclass}
                    label={this.props.label}
                    attackProperties={this.props.attackProperties}
                    alignment={this.props.alignment}
                    baseAtk={this.props.baseAtk}
                    creatureClass={this.props.creatureClass}
                    ini={this.props.ini}
                    movement={this.props.movement}
                    image={this.props.image}
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
                        <p className={style.statDisplay}>TP: <input type="number" className={style.inputField} defaultValue={this.state.currentHP} onBlur={e=>{this.handleHPChange(e); this.props.handleCurrentHPChange(e,this.props.id)}}/></p>
                        <p className={style.statDisplay}>RK: <input type="number" className={style.inputField} defaultValue={this.state.currentAC} onBlur={e=>{this.handleACChange(e); this.props.handleCurrentACChange(e,this.props.id)}}/></p>
                        <p className={style.statDisplay}>INI:<input type="number" className={style.inputField} defaultValue={this.state.currentIni} onBlur={e=>{this.handleIniChange(e); this.props.sortByIni(e,this.props.id)}}/></p>
                        <p className={style.statDisplay}>Type:
                            <input name={this.props.id+"type"} type="radio" value={"ally"} checked={this.typeChecked('ally')} onChange={e=>{this.handleTypeChange(e); this.props.handleCurrentTypeChange(e,this.props.id)}}/>Ally
                            <input name={this.props.id+"type"} type="radio" value={"monster"} checked={this.typeChecked('monster')} onChange={e=>{this.handleTypeChange(e); this.props.handleCurrentTypeChange(e,this.props.id)}}/>Monster
                            <input name={this.props.id+"type"} type="radio" value={"player"} checked={this.typeChecked('player')} onChange={e=>{this.handleTypeChange(e); this.props.handleCurrentTypeChange(e,this.props.id)}}/>Player
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