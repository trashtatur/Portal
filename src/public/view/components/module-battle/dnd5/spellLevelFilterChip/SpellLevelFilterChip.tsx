import * as React from 'react';
import {CSSProperties, ReactNode} from 'react';
import * as style from './spellLevelFilterChip.css';

interface SpellLevelFilterChipProps {
    level: number;
    isActive: boolean;
    onClick: Function;
}

export class SpellLevelFilterChip extends React.Component<SpellLevelFilterChipProps> {

    changeStyleByState = (): CSSProperties => {
        if (this.props.isActive) {
            return {backgroundColor: '#8fd8e0'}
        }
        return {backgroundColor: 'transparent'}
    }

    render(): ReactNode {
        return (
            <div
                className={style.spellLevelFilterChip}
                onClick={() => this.props.onClick(this.props.level)}
                style={this.changeStyleByState()}
            >
                {this.props.level}
            </div>
        )
    }
}