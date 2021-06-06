import * as React from 'react';
import {ReactElement} from 'react';
import {UiBasicTooltipBubble} from "../tooltip-bubble/tooltip-bubble.component";
import * as style from './tooltip.css';

interface ToolTipProps {
    toolTipTrigger?: ReactElement;
    position: 'left'|'right'|'top'|'bottom'|'topLeft'|'topRight'|'bottomLeft'|'bottomRight'|'covering';
    widthInPX?: number;
    heightInPX?: number;
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
                    <UiBasicTooltipBubble position={this.props.position}>
                        {this.props.children}
                    </UiBasicTooltipBubble>
                </div>
            </div>
        )
    }
}