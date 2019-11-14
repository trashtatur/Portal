import * as React from "react";
import {CreatureCard, saveThrowsType, statblock} from "../../creaturecard/CreatureCard";
import * as style from './creature.module.css';


export interface ICreatureProps {
    id: string,
    name: string,
    hitpoints: number,
    armorclass: number,
    alignment: string,
    creatureClass: string,
    attackProperties?: object,
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
    actions?: string[],
}

export interface ICreatureState {
    hitpoints: number
    armorclass: number
    currentIni: number
}

export class Creature extends React.Component<ICreatureProps, ICreatureState> {

    constructor(props) {
        super(props);
        this.state= {
            hitpoints: this.props.hitpoints || 0,
            armorclass: this.props.armorclass || 0,
            currentIni: this.props.currentIni || 0,
        };
        this.handleIniChange = this.handleIniChange.bind(this);
        this.handleACChange = this.handleACChange.bind(this);
        this.handleHPChange = this.handleHPChange.bind(this)
    }

    handleIniChange(event) {
        this.setState({currentIni: event.target.value})
    }

    handleACChange(event) {
        this.setState({armorclass: event.target.value})
    }

    handleHPChange(event) {
        this.setState({hitpoints: event.target.value})
    }

    render(): any {
        return (
            <div className={style.creatureDisplayContainer}>
                <CreatureCard
                    name={this.props.name}
                    hitpoints={this.props.hitpoints}
                    challenge={this.props.challenge}
                    armorclass={this.props.armorclass}
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
                    </div>
                    <div className={style.titleContainer}>
                        <h1 className={style.name}>Current</h1>
                        <div className={style.edge}/>
                    </div>
                </div>
            </div>
        )
    }
}