import * as React from "react";
import {ReactElement} from "react";
import * as style from './creatureStats.css'

export interface CreatureStatsProps {
    str: number;
    dex: number;
    wis: number;
    int: number;
    cha: number;
    con: number;
    kmb: number;
    kmv: number;
}

export class CreatureStats extends React.Component<CreatureStatsProps> {

    returnStatMod(statValue: number): string {
        const mod = (Math.floor(statValue / 2)) - 5;
        if (mod >= 0) return `+${mod}`;
        return `${mod}`
    }

    render(): ReactElement {
        return (
            <table className={style.statTable}>
                <tbody>
                <tr>
                    <td className={style.statTableCell}>STR</td>
                    <td className={style.statTableCell}>DEX</td>
                    <td className={style.statTableCell}>CON</td>
                    <td className={style.statTableCell}>INT</td>
                    <td className={style.statTableCell}>WIS</td>
                    <td className={style.statTableCell}>CHA</td>
                    <td className={style.statTableCell}>CMB</td>
                    <td className={style.statTableCell}>CMD</td>
                </tr>
                <tr>
                    <td className={style.statTableCell}>{this.props.str} ({this.returnStatMod(this.props.str)})</td>
                    <td className={style.statTableCell}>{this.props.dex} ({this.returnStatMod(this.props.dex)})</td>
                    <td className={style.statTableCell}>{this.props.con} ({this.returnStatMod(this.props.con)})</td>
                    <td className={style.statTableCell}>{this.props.int} ({this.returnStatMod(this.props.int)})</td>
                    <td className={style.statTableCell}>{this.props.wis} ({this.returnStatMod(this.props.wis)})</td>
                    <td className={style.statTableCell}>{this.props.cha} ({this.returnStatMod(this.props.cha)})</td>
                    <td className={style.statTableCell}>+{this.props.kmb} </td>
                    <td className={style.statTableCell}>{this.props.kmv} </td>
                </tr>
                </tbody>
            </table>
        )
    }
}