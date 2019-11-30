import * as React from "react";
import {CSSProperties} from "react";
import * as style from "./creatureCardTopInfo.module.css"

export interface ICreatureCardTopInfoProps {
    size:string;
    creatureClass: string;
    movement: number;
    ini: number;
    baseAtk: number;
    xp?:number;
    preview?:boolean
}

export interface ICreatureCardTopInfoState {

}



export class CreatureCardTopInfo extends React.Component<ICreatureCardTopInfoProps,ICreatureCardTopInfoState> {

    constructor(props) {
        super(props);
        this.ifPreview = this.ifPreview.bind(this);
    }


    ifPreview():CSSProperties {
        if (this.props.preview) return {height:"10em", width:"50em"};
        else return {};
    }

    render():any {
        return(
            <div className={style.topInfoContainer} style={this.ifPreview()}>
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