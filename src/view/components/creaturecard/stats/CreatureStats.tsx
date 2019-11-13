import * as React from "react";
import * as style from './creatureStats.module.css'

export interface ICreatureStatsProps {
    str: number
    dex: number
    wis: number
    int: number
    cha: number
    con: number
    kmb: number
    kmv: number
}

export interface ICreatureStatsState {

}

export class CreatureStats extends React.Component<ICreatureStatsProps, ICreatureStatsState> {

    returnStatMod(statValue: number): string {
        let mod = (Math.floor(statValue / 2)) - 5;
        if (mod >= 0) return `+${mod}`;
        return `-${mod}`
    }

    render(): any {
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
                        <td className={style.statTableCell}>KMB</td>
                        <td className={style.statTableCell}>KMV</td>
                    </tr>
                    <tr>
                        <td className={style.statTableCell}>{this.props.str} ({this.returnStatMod(this.props.str)})</td>
                        <td className={style.statTableCell}>{this.props.dex} ({this.returnStatMod(this.props.str)})</td>
                        <td className={style.statTableCell}>{this.props.con} ({this.returnStatMod(this.props.str)})</td>
                        <td className={style.statTableCell}>{this.props.int} ({this.returnStatMod(this.props.str)})</td>
                        <td className={style.statTableCell}>{this.props.wis} ({this.returnStatMod(this.props.str)})</td>
                        <td className={style.statTableCell}>{this.props.cha} ({this.returnStatMod(this.props.str)})</td>
                        <td className={style.statTableCell}>+{this.props.kmb} </td>
                        <td className={style.statTableCell}>{this.props.kmv} </td>
                    </tr>
                    </tbody>
                </table>
        )
    }
}