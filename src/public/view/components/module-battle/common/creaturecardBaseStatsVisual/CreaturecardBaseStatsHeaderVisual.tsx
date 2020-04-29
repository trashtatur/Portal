import * as React from 'react';
import {ReactNode} from 'react';
import * as style from "../../pathfinder/creaturecardStats/creaturecardStats.css";

interface CreaturecardBaseStatsVisualProps {
    str: string;
    dex: string;
    con: string;
    int: string;
    wis: string;
    cha: string;
}

export class CreaturecardBaseStatsHeaderVisual extends React.Component<CreaturecardBaseStatsVisualProps, {}> {

    render(): ReactNode {
        return (
            <>
                <td className={style.statTableCell}>{this.props.str}</td>
                <td className={style.statTableCell}>{this.props.dex}</td>
                <td className={style.statTableCell}>{this.props.con}</td>
                <td className={style.statTableCell}>{this.props.int}</td>
                <td className={style.statTableCell}>{this.props.wis}</td>
                <td className={style.statTableCell}>{this.props.cha}</td>
            </>
        )
    }
}