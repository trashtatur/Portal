import * as React from 'react';
import {ReactNode} from 'react';

interface CreaturecardBaseStatsValuesVisualProps {
    str: number;
    strMod: number;
    dex: number;
    dexMod: number;
    con: number;
    conMod: number;
    int: number;
    intMod: number;
    wis: number;
    wisMod: number;
    cha: number;
    chaMod: number;
    classNameForCells: string;
}

export class CreaturecardBaseStatsValuesVisual extends React.Component<CreaturecardBaseStatsValuesVisualProps> {

    render(): ReactNode {
        return (
            <>
                <td className={this.props.classNameForCells}>{this.props.str} ({this.props.strMod})</td>
                <td className={this.props.classNameForCells}>{this.props.dex} ({this.props.dexMod})</td>
                <td className={this.props.classNameForCells}>{this.props.con} ({this.props.conMod})</td>
                <td className={this.props.classNameForCells}>{this.props.int} ({this.props.intMod})</td>
                <td className={this.props.classNameForCells}>{this.props.wis} ({this.props.wisMod})</td>
                <td className={this.props.classNameForCells}>{this.props.cha} ({this.props.chaMod})</td>
            </>
        )
    }
}