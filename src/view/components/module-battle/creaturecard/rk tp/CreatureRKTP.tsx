import * as React from "react";
import {ReactElement} from "react";
import * as style from './creatureRKTP.css';

export interface CreatureRKTPProps {
    armorclass: number;
    tp: number;
}

export class CreatureRKTP extends React.Component<CreatureRKTPProps> {

    render(): ReactElement {
        return (
            <div className={style.creatureRKTPContainer}>
                <p className={style.key}>AC:</p>
                <p className={style.val}>{this.props.armorclass}</p>
                <p className={style.key}>HP:</p>
                <p className={style.val}>{this.props.tp}</p>
            </div>
        )
    }
}