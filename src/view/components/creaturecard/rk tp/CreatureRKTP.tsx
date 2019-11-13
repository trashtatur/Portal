import * as React from "react";
import * as style from './creatureRKTP.module.css'
export interface ICreatureRKTPProps {
    armorclass: number;
    tp: number;
}

export interface ICreatureRKTPState {

}

export class CreatureRKTP extends React.Component<ICreatureRKTPProps,ICreatureRKTPState> {

    render(): any {
        return (
            <div className={style.creatureRKTPContainer}>
                <p className={style.key}>RK:</p>
                <p className={style.val}>{this.props.armorclass}</p>
                <p className={style.key}>TP:</p>
                <p className={style.val}>{this.props.tp}</p>
            </div>
        )
    }
}