import * as React from 'react';
import {ReactElement, ReactNode} from 'react';
import * as style from './tooltip.css'

interface ToolTipProps {
    toolTipTrigger?: ReactElement;
    children?;
}

export class ToolTip extends React.Component<ToolTipProps> {

    render(): ReactElement {
        let trigger = <img
            src={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1200px-Icon-round-Question_mark.svg.png"}
            className={style.toolTipIcon}
            alt={"Tool Tip Icon"}
        />;
        if (this.props.toolTipTrigger) {
            trigger = this.props.toolTipTrigger
        }

        return (
            <div className={style.toolTipContainer}>
                {trigger}
                <div className={style.toolTipContent}>
                {this.props.children}
                </div>
            </div>
        )
    }
}