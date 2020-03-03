import * as React from "react";
import {ReactElement} from "react";
import * as style from "./creatureCardTopInfo.css"

export interface CreatureCardTopInfoProps {
    size: string;
    creatureClass: string;
    movement: number;
    ini: number;
    baseAtk: number;
    xp?: number;
}

export class CreatureCardTopInfo extends React.Component<CreatureCardTopInfoProps> {

    render(): ReactElement {
        return (
            <div className={style.topInfoContainer}>
                <p className={style.size}>{this.props.size}</p>
                <p className={style.creatureClass}>{this.props.creatureClass}</p>
                <p className={style.movement}>Movement: {this.props.movement}</p>
                <p className={style.initiative}>Ini: {this.props.ini}</p>
                <p className={style.baseAtk}>Base Attack: {this.props.baseAtk}</p>
                <p className={style.xp}>({this.props.xp || "?"} XP)</p>
            </div>
        )
    }
}