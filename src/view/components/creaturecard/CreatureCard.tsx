import * as React from "react";
import {CreatureCardHeader} from "./header/CreatureCardHeader";
import {CreatureCardTopInfo} from "./top info/CreatureCardTopInfo";
import {CreatureRKTP} from "./rk tp/CreatureRKTP";
import {CreatureStats} from "./stats/CreatureStats";
import {CreatureImage} from "./image/CreatureImage";
import {CreatureSeparator} from "./separator/CreatureSeparator";
import {CreatureAttributes} from "./attributes/CreatureAttributes";
import {CreatureAttackProperties} from "./attackProperties/CreatureAttackProperties";
import {CreatureActions} from "./attack_actions/CreatureActions";
import {action, attackProperty, saveThrowsType, statblock} from "../componentTypes";
import {ReactElement} from "react";
import * as style from "./creatureCard.css";


export interface CreatureCardProps {
    name: string;
    hitpoints: number;
    armorclass: number;
    label?: number;
    alignment: string;
    creatureClass: string;
    attackProperties?: attackProperty[];
    challenge: number;
    movement: number;
    ini: number;
    image?: string;
    baseAtk: number;
    xp?: number;
    size: string;
    stats: statblock;
    kmb: number;
    kmv: number;
    saveThrows: saveThrowsType;
    foldable?: boolean;
    languages?: string[];
    skills?: string[];
    talents?: string[];
    actions?: action[];
    preview?: boolean;
}

export interface CreatureCardState {
    isFolded: boolean;
    foldable: boolean;
}

export class CreatureCard extends React.Component<CreatureCardProps, CreatureCardState> {

    constructor(props) {
        super(props);
        this.state = {
            isFolded: this.props.foldable || false,
            foldable: this.props.foldable || false
        }
    }

    determineFolding(): object {
        if (this.state.isFolded) return {visibility: "hidden", opacity: 0, display: "none"};
        return {visibility: "visible", opacity: 1, display: "inline-block"};
    }

    toggleFold(): void {
        if (this.state.foldable) {
            if (this.state.isFolded) {
                this.setState({isFolded: false})
            } else {
                this.setState({isFolded: true})
            }
        }
    }

    render(): ReactElement {
        return (
            <div className={style.creatureCardContainer} onClick={() => this.toggleFold()}>
                <CreatureCardHeader name={this.props.name} alignment={this.props.alignment}
                                    challenge={this.props.challenge} label={this.props.label}
                />
                <div className={style.foldInContainer} style={this.determineFolding()}>
                    <CreatureCardTopInfo
                        size={this.props.size}
                        movement={this.props.movement}
                        ini={this.props.ini}
                        creatureClass={this.props.creatureClass}
                        baseAtk={this.props.baseAtk}
                        xp={this.props.xp}
                    />
                    <CreatureRKTP armorclass={this.props.armorclass} tp={this.props.hitpoints}/>
                    <CreatureImage imagePath={this.props.image}/>
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
                                        languages={this.props.languages}
                                        saveThrows={this.props.saveThrows}
                                        preview={this.props.preview}
                    />
                    <CreatureAttackProperties
                        attackProperties={this.props.attackProperties}/>
                    <CreatureActions actions={this.props.actions}/>
                </div>
            </div>
        );
    }
}