import * as React from "react";
import {ReactElement} from "react";
import {StatsViewModel} from "../../../../model/creature/StatsViewModel";
import * as style from './creatureStats.css'

export interface CreatureStatsProps {
    statsVM: StatsViewModel;
}

export class CreatureStats extends React.Component<CreatureStatsProps> {

    render(): ReactElement {
        return (
            <table className={style.statTable}>
                <tbody>
                <tr>
                    <td className={style.statTableCell}>{this.props.statsVM.LABELS.STR}</td>
                    <td className={style.statTableCell}>{this.props.statsVM.LABELS.DEX}</td>
                    <td className={style.statTableCell}>{this.props.statsVM.LABELS.CON}</td>
                    <td className={style.statTableCell}>{this.props.statsVM.LABELS.INT}</td>
                    <td className={style.statTableCell}>{this.props.statsVM.LABELS.WIS}</td>
                    <td className={style.statTableCell}>{this.props.statsVM.LABELS.CHA}</td>
                    <td className={style.statTableCell}>{this.props.statsVM.LABELS.CMB}</td>
                    <td className={style.statTableCell}>{this.props.statsVM.LABELS.CMD}</td>
                </tr>
                <tr>
                    <td className={style.statTableCell}>{this.props.statsVM.strength} ({this.props.statsVM.returnStatMod(this.props.statsVM.strength)})</td>
                    <td className={style.statTableCell}>{this.props.statsVM.dexterity} ({this.props.statsVM.returnStatMod(this.props.statsVM.dexterity)})</td>
                    <td className={style.statTableCell}>{this.props.statsVM.constitution} ({this.props.statsVM.returnStatMod(this.props.statsVM.constitution)})</td>
                    <td className={style.statTableCell}>{this.props.statsVM.intelligence} ({this.props.statsVM.returnStatMod(this.props.statsVM.intelligence)})</td>
                    <td className={style.statTableCell}>{this.props.statsVM.wisdom} ({this.props.statsVM.returnStatMod(this.props.statsVM.wisdom)})</td>
                    <td className={style.statTableCell}>{this.props.statsVM.charisma} ({this.props.statsVM.returnStatMod(this.props.statsVM.charisma)})</td>
                    <td className={style.statTableCell}>+{this.props.statsVM.getCMB()} </td>
                    <td className={style.statTableCell}>{this.props.statsVM.getCMD()} </td>
                </tr>
                </tbody>
            </table>
        )
    }
}