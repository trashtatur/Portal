import * as React from 'react';
import {ReactElement} from 'react';
import * as style from './tooltip.css'

interface ToolTipProps {
    children?;
    retrieveData: Function;
    parentHasData: boolean;
}

export class ToolTip extends React.Component<ToolTipProps> {

    conditionalRetrieveData = (): void => {
        if (this.props.parentHasData) {
            return;
        }
        this.props.retrieveData();
    };

    render(): ReactElement {
        return (
            <div className={style.toolTipContainer}>
                <img
                    src={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1200px-Icon-round-Question_mark.svg.png"}
                    className={style.toolTipIcon}
                    alt={"Tool Tip Icon"}
                    onMouseOver={this.conditionalRetrieveData}
                />
                <div className={style.toolTipContent}>
                {this.props.children}
                </div>
            </div>
        )
    }
}