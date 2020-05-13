import * as React from "react";
import {ReactElement} from "react";
import {PathfinderStatsViewModel} from "@/public/model/dataModel/pathfinder/PathfinderStatsViewModel";
import {CreaturecardBaseStatsHeaderVisual} from "../../common/creaturecardBaseStatsVisual/CreaturecardBaseStatsHeaderVisual";
import {CreaturecardBaseStatsValuesVisual} from "../../common/creaturecardBaseStatsVisual/CreaturecardBaseStatsValuesVisual";
import * as style from './creaturecardStats.css'

export interface CreatureStatsProps {
    statsVM: PathfinderStatsViewModel;
}

export class CreaturecardStats extends React.Component<CreatureStatsProps> {

    render(): ReactElement {
        return (
            <table className={style.statTable}>
                <tbody>
                <tr>
                    <CreaturecardBaseStatsHeaderVisual
                        str={this.props.statsVM.LABELS.STR}
                        dex={this.props.statsVM.LABELS.DEX}
                        con={this.props.statsVM.LABELS.CON}
                        int={this.props.statsVM.LABELS.INT}
                        wis={this.props.statsVM.LABELS.WIS}
                        cha={this.props.statsVM.LABELS.CHA}
                    />
                    <td className={style.statTableCell}>{this.props.statsVM.LABELS.CMB}</td>
                    <td className={style.statTableCell}>{this.props.statsVM.LABELS.CMD}</td>
                </tr>
                <tr>
                    <CreaturecardBaseStatsValuesVisual
                        str={this.props.statsVM.strength} strMod={this.props.statsVM.getModForStat(this.props.statsVM.strength)}
                        dex={this.props.statsVM.dexterity} dexMod={this.props.statsVM.getModForStat(this.props.statsVM.dexterity)}
                        con={this.props.statsVM.constitution} conMod={this.props.statsVM.getModForStat(this.props.statsVM.constitution)}
                        int={this.props.statsVM.intelligence} intMod={this.props.statsVM.getModForStat(this.props.statsVM.intelligence)}
                        wis={this.props.statsVM.wisdom} wisMod={this.props.statsVM.getModForStat(this.props.statsVM.wisdom)}
                        cha={this.props.statsVM.charisma} chaMod={this.props.statsVM.getModForStat(this.props.statsVM.charisma)}
                        classNameForCells={style.statTableCell}
                    />
                    <td className={style.statTableCell}>+{this.props.statsVM.getCMB()} </td>
                    <td className={style.statTableCell}>{this.props.statsVM.getCMD()} </td>
                </tr>
                </tbody>
            </table>
        )
    }
}