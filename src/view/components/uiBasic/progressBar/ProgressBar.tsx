import * as React from 'react';
import {CSSProperties, ReactNode} from 'react';
import * as style from './progressBar.css';

interface ProgressBarProps {
    min: number;
    max: number;
    current: number;
    color: string;
}

export class ProgressBar extends React.Component<ProgressBarProps> {

    getCurrentPercentStyle = (): CSSProperties => {
        let percentAmount = this.props.current / this.props.max * 100;
        if (percentAmount > 100) {
            percentAmount = 100;
        }
        if (percentAmount < 0) {
            percentAmount = 0;
        }
        return {
            width: `${percentAmount}%`,
            backgroundColor: this.props.color,
        }
    };

    render(): ReactNode {
        return (
            <div className={style.progressBar}>
                <div className={style.currentProgress} style={this.getCurrentPercentStyle()}/>
            </div>
        )
    }
}