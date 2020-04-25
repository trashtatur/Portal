import * as React from 'react';
import {CSSProperties, ReactElement} from 'react';
import * as style from './tooltip.css'

interface ToolTipProps {
    toolTipTrigger?: ReactElement;
    widthInPX?: number;
    heightInPX?: number;
    children?;
}

export class ToolTip extends React.Component<ToolTipProps> {

    conditionalStyle = (): CSSProperties=> {
      const properties: CSSProperties = {};
      if (this.props.widthInPX) {
          properties.width = this.props.widthInPX+'px'
      }
      if (this.props.heightInPX) {
          properties.height = this.props.heightInPX+'px';
      }
      return properties;
    };

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
                <div className={style.toolTipContent} style={this.conditionalStyle()}>
                {this.props.children}
                </div>
            </div>
        )
    }
}