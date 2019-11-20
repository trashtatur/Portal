import * as React from "react";
import * as style from "./creatureCardTopInfo.module.css"

export interface ICreatureCardTopInfoProps {
    size:string;
    creatureClass: string;
    movement: number;
    ini: number;
    baseAtk: number;
    xp?:number;
}

export interface ICreatureCardTopInfoState {

}

export class CreatureCardTopInfo extends React.Component<ICreatureCardTopInfoProps,ICreatureCardTopInfoState> {

    render():any {
        return(
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