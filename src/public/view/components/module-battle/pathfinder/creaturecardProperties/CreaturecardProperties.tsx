import * as React from "react";
import {ReactElement} from "react";
import {getSizeModFromSizeEnum} from "@/public/model/enumeration/pathfinder/PathfinderCreatureSizeModifierEnum";
import {PathfinderCreatureSizeEnum} from "@/public/model/enumeration/pathfinder/PathfinderCreatureSizeEnum";
import * as style from "./creaturecardProperties.css"

export interface CreatureCardTopInfoProps {
    size: PathfinderCreatureSizeEnum;
    creatureClass: string;
    movement: number;
    ini: number;
    baseAtk: number;
    xp?: number;
}

export class CreaturecardProperties extends React.Component<CreatureCardTopInfoProps> {

    render(): ReactElement {
        return (
            <div className={style.topInfoContainer}>
                <p className={`${style.topInfoSoftLabel} ${style.size}`}>{this.props.size} ({getSizeModFromSizeEnum(this.props.size)})</p>
                <p className={`${style.topInfoSoftLabel} ${style.creatureClass}`}>{this.props.creatureClass}</p>
                <p className={`${style.topInfoSoftLabel} ${style.movement}`}>Movement: {this.props.movement}</p>
                <p className={`${style.topInfoSoftLabel} ${style.initiative}`}>Ini: {this.props.ini}</p>
                <p className={`${style.topInfoSoftLabel} ${style.baseAtk}`}>Base Attack: {this.props.baseAtk}</p>
                <p className={style.xp}>({this.props.xp || "?"} XP)</p>
            </div>
        )
    }
}