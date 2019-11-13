import * as React from "react";
import {CreatureCardHeader} from "./header/CreatureCardHeader";
import {CreatureCardTopInfo} from "./top info/CreatureCardTopInfo";
import * as style from "./creatureCard.module.css"
import {CreatureRKTP} from "./rk tp/CreatureRKTP";
import {CreatureStats} from "./stats/CreatureStats";
import {CreatureImage} from "./image/CreatureImage";
import {CreatureSeparator} from "./separator/CreatureSeparator";
import {CreatureAttributes} from "./attributes/CreatureAttributes";
import {CreatureAttackProperties} from "./attackProperties/CreatureAttackProperties";
import {CreatureActions} from "./attack_actions/CreatureActions";

export type saveThrowsType = {
    ref:number,
    will:number,
    fort:number
}

type statblock = {
    str:number,
    con:number,
    wis:number,
    int:number,
    cha:number,
    dex:number
}

export interface ICreatureCardProps {
    name: string,
    hitpoints: number,
    armorclass: number,
    alignment: string,
    creatureClass: string,
    attackProperties?: object,
    challenge: number,
    movement: number,
    ini: number,
    baseAtk: number,
    xp?: number,
    size: string,
    stats: statblock,
    kmb: number,
    kmv: number,
    saveThrows: saveThrowsType,
    languages?: string[],
    senses?: string[],
    skills?: string[],
    talents?: string[],
    actions?: string[],
}

export interface ICreatureCardState {

}

export class CreatureCard extends React.Component<ICreatureCardProps,ICreatureCardState>{

    render(){
        return (
            <div className={style.creatureCardContainer}>
            <CreatureCardHeader name={this.props.name} alignment={this.props.alignment} challenge={this.props.challenge}/>
            <CreatureCardTopInfo
                size={this.props.size}
                movement={this.props.movement}
                ini={this.props.ini}
                creatureClass={this.props.creatureClass}
                baseAtk={this.props.baseAtk}
                xp={this.props.xp}
            />
            <CreatureRKTP armorclass={this.props.armorclass} tp={this.props.hitpoints}/>
            <CreatureImage imagePath={'images/Creature.png'}/>
            <CreatureStats str={this.props.stats.str}
                           dex={this.props.stats.dex}
                           wis={this.props.stats.wis}
                           int={this.props.stats.int}
                           cha={this.props.stats.cha}
                           con={this.props.stats.con}
                           kmb={this.props.kmb}
                           kmv={this.props.kmv}
            />
            <CreatureSeparator/>
            <CreatureAttributes skills={this.props.skills}
                                talents={this.props.talents}
                                senses={this.props.senses}
                                languages={this.props.languages}
                                saveThrows={this.props.saveThrows}
            />
            <CreatureAttackProperties attackProperties={[{name:"brute",property:"deal 6 more damage with melee hit"}]}/>
            <CreatureActions actions={[{
                name:"Morningstar",
                rangeType:"Melee",
                attackBonus:4,
                damage:"1d8",
                critmod:"x3",
                damageType:"blunt",
                additionalInfo:"This hits hard"
            }]}/>
            </div>
        );
    }
}